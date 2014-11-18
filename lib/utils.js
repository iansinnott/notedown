Utils = {

  /**
   * A simple shortcut. Easier to remember.
   */
  ENTER_KEY: 13,

  /**
   * Any keys that correspond to various types of power notes.
   */
  TOKENS: {
    '!': 'action',
    '?': 'question'
  },

  /**
   * Log a meteor error to the console in a human-readable form.
   */
  logError: function(err) {
    if (err) return console.error(err.reason);
  }

};

/**
 * Client-specific helpers.
 */
if (Meteor.isClient) {
  _.extend(Utils, {

    /**
     * Update a users 'profile' field with arbitrary data. This is writeable by
     * default by the client. This is just a shortcut to make it easier to do
     * updates and avoid repetitive logic.
     */
    updateProfile: function(data) {
      return Meteor.users.update(Meteor.userId(), { $set: { profile: data } });
    },

    /**
     * Return a function that will return a reactive mongo cursor. This is simply to
     * dry out the code as the only differences between cursor options throughout
     * the app are either 'type' or 'archived' status.
     *
     * Note that all notes belonging to the current user are loaded into minimongo.
     * Here we define the set of notes that should be visible on the /notes page at
     * any point in time. Notes to display will match the following criteria:
     * - Belong to the current user
     * - Are linked to the currently selected client
     * - Type of note: note|action|question (subject to change)
     * - Archived or not
     *
     * The current client can be set a number of ways throughout the app, but since
     * Session is a reactive data source we don't have to worry about that.
     * Whenever the current client changes the view will re-render.
     *
     * Note: The cursor must be defined and returned from within a function
     * instead fo directly on the helpers object. Otherwise reactivity will not
     * work. That's why we return a function rather than the cursor directly.
     * @return {function}
     */
    getCursorFor: function(type, archived) {
      return function() {
        return Notes.find({
                 archived: archived || false, // Can't pass undefined
                 type: type || 'note', // Prefer explicitly setting type to 'note'
                 client: Session.get('currentClient') || Meteor.userId()
               }, { sort: { 'created_at': -1 } });
      };
    }

  });
}
