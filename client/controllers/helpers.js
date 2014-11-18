/**
 * Global Template Helpers
 *
 * Note that 'this' will be set to the context of wherevere the helper is
 * called. See formatDate bellow for more on this.
 */

var Helpers = {

  /**
   * Return a formated date based on the timestamp of the current note.
   *
   * Note: This must be called in the context of a single note ojbect so that
   * created_at is defined and an integer.
   * @return {string} current year (YYYY)
   */
  formatDate: function() {
    return moment(this.created_at).format('MM-DD HH:mm');
  },

  /**
   * Return the current user's email, or nothing if they aren't logged in.
   * Emails are used as user names in the app.
   * @return {string|undefined}
   */
  userEmail: function() {
    if (Meteor.user())
      return Meteor.user().emails[0].address;
  },

  hasNotes: _has(Notes, { archived: false }),
  hasArchive: _has(Notes, { archived: true }),
  hasQuestions: _has(Notes, { type: 'question' }),
  hasActions: _has(Notes, { type: 'action' }),
  hasClients: _has(Clients, { archived: false }),
  hasClientsArchive: _has(Clients, { archived: true })

};

/**
 * A helper function for determining the existence of records in a collection
 * reactively and based on certain criteria. This is simply a helper to dry out
 * the code that I initially had in place.
 */
function _has(collection, criteria) {
  return function() {
    if (collection === Notes)
      _.extend(criteria, { client: Session.get('currentClient') });
    return collection.find(criteria).count() > 0;
  };
}

// Register all template helpers.
_.each(Helpers, function(func, key) { Template.registerHelper(key, func); });

