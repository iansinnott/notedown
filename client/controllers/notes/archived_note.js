Template.archivedNote.events({
  'click .restore': function(e, view) {
    Meteor.call('restore', view.data);
  },
  'click .delete': function(e, view) {
    if (!confirm("Are you sure? This can't be undone.")) return false;
    Meteor.call('destroy', view.data);
  }
});
