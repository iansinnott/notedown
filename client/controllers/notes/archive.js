Template.archive.helpers({
  archived_notes: Notes.find({ archived: true }, { sort: { 'created_at': -1 } })
});
