var ENTER_KEY = 13;

Template.notes.helpers({
  notes: Notes.find({ archived: false }, { sort: { 'created_at': -1 } }),
  archived_notes: Notes.find({ archived: true }, { sort: { 'created_at': -1 } })
});

Template.notes.events({
  'focus input': function(e, view) {
    view.$('#new-note').addClass('focus');
  },

  'blur input': function(e, view) {
    view.$('#new-note').removeClass('focus');
  },

  'keydown input': function(e, view) {
    var input = e.currentTarget;

    if (e.which === ENTER_KEY && input.value.trim()) {
      Meteor.call('note', input.value.trim(), function(err, id) {
        if (err) return console.error(err.reason);

        // TODO: This should be removed
        console.log(id);
      });
      input.value = '';
    }
  }
});
