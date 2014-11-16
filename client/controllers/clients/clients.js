// Client List

Template.clients.helpers({
  clients: Clients.find({ archived: false }, { sort: { 'created_at': -1 } }),
  archived_clients: Clients.find({ archived: true }, { sort: { 'created_at': -1 } })
});

Template.clients.events({
  'focus #new-note input': function(e, template) {
    template.$('#new-note').addClass('focus');
  },

  'blur #new-note input': function(e, template) {
    template.$('#new-note').removeClass('focus');
  },

  'keydown #new-client input': function(e, template) {
    var input = e.currentTarget;

    if (e.which === Utils.ENTER_KEY && input.value.trim()) {
      Meteor.call('client', input.value.trim(), Utils.logError);
      input.value = '';
    }
  }
});
