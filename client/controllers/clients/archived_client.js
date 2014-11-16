Template.archivedClient.events({

  'click .restore': function(e, view) {
    Meteor.call('restoreClient', view.data);
  },

  'click .delete': function(e, view) {
    if (!confirm("Are you sure? This can't be undone.")) return false;
    Meteor.call('destroyClient', view.data);
  }

});
