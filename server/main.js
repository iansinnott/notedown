// Fixtures
// Currently not added.
Meteor.startup(function () {

  // TODO: This was here for debugging, remove
  var add_fixtures = false;

  if (add_fixtures) {
    Notes.insert({
      type: 'note', // String note|action|question
      note: "Hey bro nice notes",
      userId: Meteor.userId(),
      archived: false, // Bool true|false
      client: null, // null|String 'id'
      created_at: Date.now(),
      updated_at: Date.now()
    });
    Notes.insert({
      type: 'note',
      note: "Second Note, it's pretty great.",
      userId: Meteor.userId(),
      archived: false,
      client: null,
      created_at: Date.now(),
      updated_at: Date.now()
    });
  }
});

