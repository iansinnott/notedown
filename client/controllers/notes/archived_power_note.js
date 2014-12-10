Template.archivedPowerNote.events(ArchivedNoteEvents);

Template.archivedPowerNote.helpers({

  /**
   * Return the token (single key) for this power note given the notes type.
   * TODO: This may be unecisarily backwards, consider refactoring.
   * @return {string} !|?
   */
  token: function() {
    return Utils.TOKENS.byType(this.type);
  }

});
