Template.notesHeader.helpers({
  userId: Meteor.userId(),
  clients: Clients.find({ archived: false }, { sort: { 'name': 1 } })
});

Template.notesHeader.events({
  'change .client-select select': function(e) {
    console.log(e.currentTarget.value); // debug
    Session.set('currentClient', e.currentTarget.value);
  }
});

Template.notesHeader.rendered = function() {
  var $select = this.$('#select2');
  $select.select2({
    placeholder: 'Select a client...',
    allowClear: true
  });
  $select.select2('val', Session.get('currentClient') || '');
};
