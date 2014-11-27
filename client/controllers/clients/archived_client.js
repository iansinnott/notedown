var warning = "Are you sure? This will delete the client along with ALL NOTES" +
              " that you have saved for this client. This action cannot be" +
              " undone.";

Template.archivedClient.events({

  'click .restore': function(e, view) {
    Meteor.call('restoreClient', view.data);
  },

  'click .delete': function(e, view) {
    if (!confirm(warning)) return false;
    Meteor.call('destroyClient', view.data);
  }

});
