Template.notes.helpers({

  notes: Utils.getCursorFor('note'),
  actions: Utils.getCursorFor('action'),
  questions: Utils.getCursorFor('question'),

  showAlert: function() {
    return Meteor.user().profile.noClientWarning;
  }

});

Template.notes.events(NoteListEvents);

