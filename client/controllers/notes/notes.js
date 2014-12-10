Template.notes.helpers({

  notes: Utils.getCursorFor('note'),
  actions: Utils.getCursorFor('action'),
  questions: Utils.getCursorFor('question'),

  showAlert: function() {
    return Meteor.user().profile.noClientWarning;
  }

});

Template.notes.events({
  'focus #new-note input': function(e, template) {
    template.$('#new-note').addClass('focus');
  },

  'blur #new-note input': function(e, template) {
    template.$('#new-note').removeClass('focus');
  },

  'keydown #new-note textarea': function(e, template) {
    var input    = e.currentTarget,
        text     = input.value.trim(),
        clientId = Session.get('currentClient');

    if (e.which === Utils.ENTER_KEY && !e.shiftKey && text) {
      Meteor.call('note', text, clientId, Utils.logError);
      input.value = '';
    }
  },

  /**
   * No preventing the default here because we actually want the default
   * behavior. Just want to make sure the message doesn't show up again next
   * time the user comes back to the notes page.
   */
  'click .close-redirect': function() {
    Utils.updateProfile({ noClientWarning: false });
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
      Utils.updateProfile({ noClientWarning: false });
    });
  }
});

