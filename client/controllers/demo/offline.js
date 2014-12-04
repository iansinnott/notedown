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

Template.offline.events({
  'focus #new-note input': function(e, template) {
    template.$('#new-note').addClass('focus');
  },

  'blur #new-note input': function(e, template) {
    template.$('#new-note').removeClass('focus');
  },

  'keydown #new-note input': function(e, template) {
    var input = e.currentTarget,
        text  = input.value.trim();

    if (e.which === Utils.ENTER_KEY && text) {
      createDemoNote(text);
      input.value = '';
    }
  },

  /**
   * Close the dialogue that informs the user about not having clients. I save
   * the fact that hey have seen this message to their profile only after the
   * animation has completed b/c otherwise the reactivity would cause the alert
   * to dissappear before it slid up.
   */
  'click .close': function(e, template) {
    e.preventDefault();
    template.$('.alert-info').slideUp(function() {
      var data = $(e.currentTarget).data('sessionSet')
      console.log('data: ' + data); // debug
      Session.set(data, false);
    });
  }
});
