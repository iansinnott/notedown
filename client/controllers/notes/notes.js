Template.notes.helpers({
  notes: Utils.getCursorFor('note'),
  actions: Utils.getCursorFor('action'),
  questions: Utils.getCursorFor('question')
});

Template.notes.events({
  'focus #new-note input': function(e, template) {
    template.$('#new-note').addClass('focus');
  },

  'blur #new-note input': function(e, template) {
    template.$('#new-note').removeClass('focus');
  },

  'keydown #new-note input': function(e, template) {
    var input    = e.currentTarget,
        text     = input.value.trim(),
        clientId = Session.get('currentClient');

    if (e.which === Utils.ENTER_KEY && text) {
      Meteor.call('note', text, clientId, Utils.logError);
      input.value = '';
    }
  },

  /**
   * TODO: I need to save the fact that this has been shown already. Save this
   * functionality for until I figure out how I want to write user prefs.
   */
  'click .close': function(e, template) {
    e.preventDefault();
    template.$('.alert-info').slideUp();
  }
});

/**
 * Setup autoresize for all textareas. They are hidden initially.
 */
Template.notes.rendered = function() {
  this.$('textarea.text-edit').autosize({
    append: false // Don't append a newline
  });
};
