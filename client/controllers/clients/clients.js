// Client List

Template.clients.helpers({
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
