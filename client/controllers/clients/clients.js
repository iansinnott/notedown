// Client List

Template.clients.helpers({
  clients: Clients.find({ archived: false }, { sort: { 'name': 1 } }),
  archived_clients: Clients.find({ archived: true }, { sort: { 'name': 1 } })
});

Template.clients.events({
  'focus #new-client input': function(e, template) {
    template.$('#new-client').addClass('focus');
  },

  'blur #new-client input': function(e, template) {
    template.$('#new-client').removeClass('focus');
  },

  'keydown #new-client input': function(e, template) {
    var input = e.currentTarget;

    if (e.which === Utils.ENTER_KEY && input.value.trim()) {
      Meteor.call('client', input.value.trim(), Utils.logError);
      input.value = '';
    }
  }
});

/**
 * Setup autoresize for all textareas. They are hidden initially.
 */
Template.clients.rendered = function() {

  // Focus if passed the hash
  if (location.hash === '#new')
    this.$('#new-client input').focus();

  // Set up autosize
  this.$('textarea.text-edit').autosize({
    append: false // Don't append a newline
  });
};
