// NOTE: This is fucking rediculous, but we have to use this.userId instead of
// Meteor.userId(). For some reason the latter doesn't work. Nothing wrong with
// this syntax (it's actually cleaner) but the fact that Meteor.userId() doesn't
// work at all is just rediculous.
Meteor.publish('notes', function() {
  return Notes.find({ userId: this.userId });
});

