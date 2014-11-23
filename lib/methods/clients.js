/**
 * Keys that can be set by the user. Only keys defined here can be updated in
 * the updateNote method.
 */
var SAFE_KEYS = [
  'name',
  'archived'
];

/**
 * Does the current user own the doc in question?
 * @return {undefined|object}
 */
function currentUserIsOwner(doc) {
  return Clients.findOne({ _id: doc._id, userId: Meteor.userId() });
}

Clients.before.update(function (userId, doc, fieldNames, modifier, options) {

  // Make sure there that the note belongs to the current user.
  if (!currentUserIsOwner(doc)) return false;

  if (modifier.$set) {
    modifier.$set = _.pick(modifier.$set , SAFE_KEYS);
    modifier.$set.updated_at = Date.now();
  }
});

Clients.before.remove(function(userId, doc) {
  if (!currentUserIsOwner(doc)) return false;
});

Meteor.methods({

  client: function(name) {
    name = name.trim();

    if (!name) return new Meteor.Error('no-name', 'No name provided.');

    return Clients.insert({
      name: name,
      userId: Meteor.userId(),
      archived: false,
      created_at: Date.now(),
      updated_at: Date.now()
    });
  },

  updateClient: function(client, data) {
    Clients.update(client, { $set: data });
  },

  archiveClient: function(client) {
    Clients.update(client, { $set: { archived: true } });
  },

  restoreClient: function(client) {
    Clients.update(client, { $set: { archived: false } });
  },

  destroyClient: function(client) {
    Clients.remove(client);
  }

});
