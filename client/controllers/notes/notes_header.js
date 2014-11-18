Template.notesHeader.helpers({
  userId: Meteor.userId(),
  clients: Clients.find({ archived: false }, { sort: { 'name': 1 } })
});

Template.notesHeader.events({

  /**
   * Whenever the select is changed reroute to a client-specific route. This way
   * we can bookmark certain clients and such without fear of losing what we
   * were looking at. My current method for detecting the base of the path,
   * either 'notes' or 'archives', doesn't feel very elegant but it works for
   * now.
   */
  'change .client-select select': function(e) {
    var id       = e.currentTarget.value,
        pathname = window.location.pathname,
        base     = (pathname.match('notes')) ? '/notes/' : '/archive/';

    if (id === Meteor.userId())
      Router.go(base + 'me');
    else
      Router.go(base + id);
  }
});

Template.notesHeader.rendered = function() {
  var $select = this.$('#select2');

  // Initialize select2
  $select.select2({
    placeholder: 'Select a client...',
    allowClear: true
  });

  // Set the value to the currently selected client if there is one.
  $select.select2('val', Session.get('currentClient') || '');
};
