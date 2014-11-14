// NOTE: This is fucking rediculous, but we have to use this.userId instead of
// Meteor.userId(). For some reason the latter doesn't work.
Meteor.publish('notes', function() {
  return Notes.find({ author: this.userId });
});
