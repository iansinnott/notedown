Template.offline.helpers({

  notes: function() {
    return DemoNotes.find({ type: 'note' }, { sort: { 'created_at': -1 } });
  },

  actions: function() {
    return DemoNotes.find({ type: 'action' }, { sort: { 'created_at': -1 } });
  },

  questions: function() {
    return DemoNotes.find({ type: 'question' }, { sort: { 'created_at': -1 } });
  },

  /**
   * Only show to not loggec in users.
   */
  showDemoAlert: function() {
    if (Meteor.user()) return false;
    return Session.get('showDemoAlert');
  },

  /**
   * Only show to logged in users who are looking at the offline app.
   */
  showOfflineWarning: function() {
    if (!Meteor.user()) return false;
    return Session.get('showOfflineWarning');
  }

});

Template.offline.events(DemoNoteListEvents);
