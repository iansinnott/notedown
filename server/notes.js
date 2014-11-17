// NOTE: This is fucking rediculous, but we have to use this.userId instead of
// Meteor.userId(). For some reason the latter doesn't work. Nothing wrong with
// this syntax (it's actually cleaner) but the fact that Meteor.userId() doesn't
// work at all is just rediculous.
Meteor.publish('notes', function() {
  return Notes.find({ userId: this.userId });
});


/**
 * A dictionary of all tokens with special meaning in Notedown
 */
var TOKENS = {
  '!': 'action',
  '?': 'question'
};

Meteor.methods({

  /**
   * Create a new Note. Notes are attached to clients, or the current user. If
   * no client is selected (especially when the user has yet to create any
   * clients) any new notes will assign the current users ID as the client id.
   *
   * Note: Client ID has to be passed from the client because the server has no
   * access to Session.
   */
  note: function(text, clientId) {
    if (!text)
      throw new Meteor.Error('no-text', 'No text provided.');

    var type = TOKENS[text[0]] || 'note';

    return Notes.insert({
      type: type,
      note: (type === 'note') ? text : text.slice(1),
      userId: Meteor.userId(),
      archived: false,
      client: clientId || Meteor.userId(), // Default to current user
      created_at: Date.now(),
      updated_at: Date.now()
    });
  },

  /**
   * Update an existing note.
   *
   * TODO: This isn't very secure it seems.
   */
  updateNote: function(note, data) {
    Notes.update(note, { $set: data });
  },

  /**
   * Archive a note. Notes that are note yet archived can only be archived as
   * opposed to deleted. Only notes that have already been archived can be
   * deleted.
   */
  archiveNote: function(note) {
    Notes.update(note, { $set: { archived: true } });
  },

  /**
   * The opposite of the archive method. This restores a note to the primary
   * context.
   * Todo: This could be combined with archive into a toggle method.
   */
  restoreNote: function(note) {
    Notes.update(note, { $set: { archived: false } });
  },

  /**
   * Remove a note.
   */
  destroyNote: function(note) {
    Notes.remove(note);
  }

});
