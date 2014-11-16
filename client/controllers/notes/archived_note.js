Template.archivedNote.events({
  'click .restore': function(e, view) {
    Meteor.call('restoreNote', view.data);
  },
  'click .delete': function(e, view) {
    if (!confirm("Are you sure? This can't be undone.")) return false;
    Meteor.call('destroyNote', view.data);
  }
});
