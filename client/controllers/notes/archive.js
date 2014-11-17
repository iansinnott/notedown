// TODO: Most of this code is hared with the find function in notes.js. In fact
// the only difference is archived: true. Consider refactoring.
Template.archive.helpers({
  archived_notes: function() {
    return Notes.find({
             archived: true,
             client: Session.get('currentClient') || Meteor.userId()
           }, { sort: { 'created_at': -1 } });
  }
});
