/**
 * NoteEvents are events shared by various note-types. See lib/note_events.js
 */
Template.powerNote.events(NoteEvents);

Template.powerNote.helpers({

  /**
   * Return the token (single key) for this power note given the notes type.
   * TODO: This may be unecisarily backwards, consider refactoring.
   * @return {string} !|?
   */
  token: function() {
    return _.invert(Utils.TOKENS)[this.type];
  }

});

// DONE
// ----
// TODO: Write the events so that notes are editable and archivable

// YET TODO
// --------
// TODO: Show actions and questions in the archive
// TODO: Make sure they are editable and deletable in the archives
// TODO: Improve site styling to make it more like the inital stenotyper
// TODO: Reset database and test a bit
// TODO: Initial live test. Push to dev server.

