Meteor.startup(function () {
  if (!Notes.find().count()) {
    Notes.insert({
      type: 'note', // note|action|question
      note: "Hey bro nice notes",
      date: new Date()
    });
    Notes.insert({
      type: 'note', // note|action|question
      note: "Second Note, it's pretty great.",
      date: new Date()
    });
  }
});
