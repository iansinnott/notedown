Template.notesHeader.helpers({
  clients: Clients.find({ archived: false }, { sort: { 'created_at': -1 } })
});

Template.notesHeader.rendered = function() {
  this.$('#select2').select2({
    placeholder: 'Select a client...',
    allowClear: true
  });
};
