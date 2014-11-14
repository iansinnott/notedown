// NOTE: This is fucking rediculous, but we have to use this.userId instead of
// Meteor.userId(). For some reason the latter doesn't work. Nothing wrong with
// this syntax (it's actually cleaner) but the fact that Meteor.userId() doesn't
// work at all is just rediculous.
Meteor.publish('notes', function() {
  return Notes.find({ author: this.userId });
});


/**
 * A dictionary of all tokens with special meaning in Notedown
 */
var TOKENS = {
  '!': 'action',
  '?': 'question'
};

// Temp: Refactor this
// Todo
function selectedClient() {
  return false;
}

Meteor.methods({

  /**
   * Create a new Note
   */
  note: function(text) {
    if (!text)
      throw new Meteor.Error('no-text', 'No text provided.');

    var type = TOKENS[text[0]] || 'note';

    return Notes.insert({
      type: type,
      note: (type === 'note') ? text : text.slice(1),
      userId: Meteor.userId(),
      archived: false,
      client: selectedClient() || null,
      created_at: Date.now(),
      updated_at: Date.now()
    });
  },

  /**
   * Archive a note. Notes that are note yet archived can only be archived as
   * opposed to deleted. Only notes that have already been archived can be
   * deleted.
   */
  archive: function(note) {
    Notes.update(note, { $set: { archived: true } });
  },

  /**
   * The opposite of the archive method. This restores a note to the primary
   * context.
   * Todo: This could be combined with archive into a toggle method.
   */
  restore: function(note) {
    Notes.update(note, { $set: { archived: false } });
  },

  /**
   * Remove a note.
   */
  destroy: function(note) {
    Notes.remove(note);
  }

});
