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
    return Utils.TOKENS.byType(this.type);
  }

});
