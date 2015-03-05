/**
 * Global Template Helpers
 *
 * Note that 'this' will be set to the context of wherevere the helper is
 * called. See formatDate bellow for more on this.
 */

var Helpers = {

  noteToHTML: function() {
    return marked(this.note);
  },

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
    if (Meteor.user()) return Meteor.user().emails[0].address;
  },

  /**
   * Return the name of the current client to the template, or if the 'current
   * client' is the current user then return 'yourself'.
   * @return {string}
   */
  currentClient: function() {
    var id = Session.get('currentClient');
    if (id === Meteor.userId()) return 'yourself';
    return Clients.findOne(id).name;
  },

  isProduction: function() {
    if (typeof process !== 'undefined')
      return process.env.NODE_ENV === 'production';
    else
      return location.hostname === PRODUCTION_HOSTNAME;
  },

  /**
   * The following check the existence of various records in the DB given
   * creteria (second arg). See _hasRecords bellow for more info.
   */
  hasNotes: _hasRecords(Notes, { archived: false }),
  hasArchive: _hasRecords(Notes, { archived: true }),
  hasQuestions: _hasRecords(Notes, { type: 'question' }),
  hasActions: _hasRecords(Notes, { type: 'action' }),
  hasPowerNotes: _hasRecords(Notes, {
    type: { $in: Utils.TOKENS.values() },
    archived: false
  }),
  hasPowerNotesArchive: _hasRecords(Notes, {
    type: { $in: Utils.TOKENS.values() },
    archived: true
  }),
  hasClients: _hasRecords(Clients, { archived: false }),
  hasClientsArchive: _hasRecords(Clients, { archived: true }),

  hasDemoNotes: _hasRecords(DemoNotes, {}),
  hasDemoQuestions: _hasRecords(DemoNotes, { type: 'question' }),
  hasDemoActions: _hasRecords(DemoNotes, { type: 'action' }),
  hasDemoPowerNotes: _hasRecords(DemoNotes, { type: { $in: Utils.TOKENS.values() } }),

  hasTempDemoNotes: _hasRecords(TempDemoNotes, {})

};

/**
 * A helper function for determining the existence of records in a collection
 * reactively and based on certain criteria. This is simply a helper to dry out
 * the code that I initially had in place.
 *
 * Note that in the case of the Notes collection we also want to make sure we're
 * only checking for records that apply to the currently selected client.
 *
 * TODO: This might fit better under Utils. If it becomes necessary elsewhere in
 * the app then refactor.
 *
 * @return {function}
 */
function _hasRecords(collection, criteria) {
  return function() {
    if (collection === Notes)
      _.extend(criteria, { client: Session.get('currentClient') });
    return collection.find(criteria).count() > 0;
  };
}

// Register all template helpers.
_.each(Helpers, function(func, key) { Template.registerHelper(key, func); });

