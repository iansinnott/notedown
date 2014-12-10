/**
 * GroundDB makes sure demo notes are persisted to local storage instead of only
 * living in memory. These are client-side-only collections and thus should
 * never be instantiated on the server.
 */
if (Meteor.isClient) {
  DemoNotes = new GroundDB('demo', { connection: null });
  TempDemoNotes = new Meteor.Collection(null);
}

