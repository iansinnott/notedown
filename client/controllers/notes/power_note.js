/**
 * NoteEvents are events shared by various note-types. See lib/note_events.js
 */
Template.powerNote.events(NoteEvents);

/**
 * TODO: This is the same for power notes as well as archived power notes. Could
 * stand to be dryed out.
 */
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
// TODO: Show actions and questions in the archive
// TODO: Make sure they are editable and deletable in the archives (update, not
//       necessary. Forgot that archived notes aren't editable)
// TODO: Add routes for various client notes. Currently refreshing after
//       selecting a client will reset to 'Me'. (Might be buggy...)

// YET TODO
// --------
// TODO: Improve site styling to make it more like the inital stenotyper
// TODO: Style /clients page
// TODO: Reset database and test a bit
// TODO: Initial live test. Push to dev server.

