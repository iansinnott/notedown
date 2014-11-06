Template.notes.helpers({
  notes: Notes.find()
});

Template.notes.events({
  'click .click-me': function(e) {
    e.preventDefault();
    console.log('Hey dudes'); // debug
  }
});
