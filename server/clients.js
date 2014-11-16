Meteor.methods({

  client: function(name) {
    name = name.trim();

    if (!name) return new Meteor.Error('no-name', 'No name provided.');

    return Client.insert({
      name: name,
      userId: Meteor.userId(),
      archived: false,
      created_at: Date.now(),
      updated_at: Date.now()
    });
  },

  updateClient: function(client) { },

  archiveClient: function(client) { },

  restoreClient: function(client) { },

  destroyClient: function(client) { }

});
