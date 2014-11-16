Template.notes.helpers({
  notes: Notes.find({ archived: false }, { sort: { 'created_at': -1 } })
});

Template.notes.events({
  'focus #new-note input': function(e, template) {
    template.$('#new-note').addClass('focus');
  },

  'blur #new-note input': function(e, template) {
    template.$('#new-note').removeClass('focus');
  },

  'keydown #new-note input': function(e, template) {
    var input = e.currentTarget;

    if (e.which === Utils.ENTER_KEY && input.value.trim()) {
      Meteor.call('note', input.value.trim(), Utils.logError);
      input.value = '';
    }
  }
});
