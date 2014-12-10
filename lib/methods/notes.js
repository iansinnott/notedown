/**
 * Keys that can be set by the user. Only keys defined here can be updated in
 * the updateNote method.
 */
var SAFE_KEYS = [
  'note',
  'archived'
];

/**
 * Does the current user own the doc in question?
 * @return {undefined|object}
 */
function currentUserIsOwner(doc) {
  return Notes.findOne({ _id: doc._id, userId: Meteor.userId() });
}

Notes.before.update(function (userId, doc, fieldNames, modifier, options) {

  // Make sure there that the note belongs to the current user.
  if (!currentUserIsOwner(doc)) return false;

  if (modifier.$set) {
    modifier.$set = _.pick(modifier.$set , SAFE_KEYS);
    modifier.$set.updated_at = Date.now();
  }
});

Notes.before.remove(function(userId, doc) {
  if (!currentUserIsOwner(doc)) return false;
});

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

    // Make sure there is no extra whitespace messing with the first and last
    // character.
    text = text.trim();

    var prefix = _.first(text),
        suffix = _.last(text),
        type;

    // Note type defaults to 'note'.
    if (Utils.TOKENS.PREFIX[prefix]) {
      type = Utils.TOKENS.PREFIX[prefix];
      text = text.slice(1).trim();
    } else if (Utils.TOKENS.SUFFIX[suffix]) {
      type = Utils.TOKENS.SUFFIX[suffix];
    } else {
      type = 'note';
    }

    return Notes.insert({
      type: type,
      note: text,
      userId: Meteor.userId(),
      archived: false,
      client: clientId || Meteor.userId(), // Default to current user
      created_at: Date.now(),
      updated_at: Date.now()
    });
  },

  /**
   * Update an existing note. Data will be checked before it's inserted into the
   * database using the before.update hook.
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
