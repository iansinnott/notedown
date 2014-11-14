Meteor.startup(function () {

  // TODO: This was here for debugging, remove
  var add_fixtures = false;
  if (add_fixtures) {
    Notes.insert({
      type: 'note', // String note|action|question
      note: "Hey bro nice notes",
      author: Meteor.userId(),
      archived: false, // Bool true|false
      client: null, // null|String 'id'
      created_at: Date.now(),
      updated_at: Date.now()
    });
    Notes.insert({
      type: 'note',
      note: "Second Note, it's pretty great.",
      author: Meteor.userId(),
      archived: false,
      client: null,
      created_at: Date.now(),
      updated_at: Date.now()
    });
  }
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
      author: Meteor.userId(),
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
