/**
 * TODO: This is basically mimicking autopublish. Make sure that this gets fixed
 * to only publish clients of a given user.
 */
Meteor.publish('clients', function() {
  return Clients.find({ userId: this.userId });
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
