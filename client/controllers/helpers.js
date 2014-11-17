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

  hasNotes: function() {
    return Notes.find().count() > 0;
  },

  hasClients: function() {
    return Clients.find().count() > 0;
  }

};

// Register all template helpers.
_.each(Helpers, function(func, key) { Template.registerHelper(key, func); });

