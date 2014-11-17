Template.notes.helpers({
  notes: Notes.find({
           archived: false,
           client: Session.get('currentClient') || Meteor.userId()
         }, { sort: { 'created_at': -1 } })
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
