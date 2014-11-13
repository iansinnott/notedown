Template.note.events({
  'click .delete': function(e, view) {
    Meteor.call('archive', view.data);
  }
});
