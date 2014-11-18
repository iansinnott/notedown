// TODO: Most of this code is hared with the find function in notes.js. In fact
// the only difference is archived: true. Consider refactoring.
Template.archive.helpers({
  archived_notes: Utils.getCursorFor('note', true),
  actions: Utils.getCursorFor('action', true),
  questions: Utils.getCursorFor('question', true)
});
