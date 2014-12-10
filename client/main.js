Meteor.subscribe('notes');
Meteor.subscribe('clients');

var landingFixtures = [
  {
    type: 'action',
    note: 'Type in the box above to create notes.',
    created_at: Date.now(),
    updated_at: Date.now()
  },{
    type: 'question',
    note: "Create questions by ending a sentence with a '?'",
    created_at: Date.now(),
    updated_at: Date.now()
  },{
    type: 'note',
    note: "Add as many notes as you like!",
    created_at: Date.now(),
    updated_at: Date.now()
  },{
    type: 'note',
    note: "When you're ready, create an account and your notes will be saved, backed up and available on multiple devices.",
    created_at: Date.now(),
    updated_at: Date.now()
  }
]

if (TempDemoNotes.find().count() === 0) {
  landingFixtures.forEach(function(note) {
    TempDemoNotes.insert(note);
  });
}
