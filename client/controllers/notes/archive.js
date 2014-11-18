Template.archive.helpers({
  archived_notes: Utils.getCursorFor('note', true),
  actions: Utils.getCursorFor('action', true),
  questions: Utils.getCursorFor('question', true)
});
