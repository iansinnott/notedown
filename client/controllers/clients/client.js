/**
 * The client row.
 *
 * TODO: This is not super dry. IT's basically the same as the functionality
 *       included for a note row.
 */
Template.client.events({

  'click .view': function(e, template) {
    Router.go('/notes/' + template.data._id);
  },

  'dblclick .text': function(e, template) {
    template.$('.client').addClass('editting');
    template.$('.text-edit').focus();
  },

  'keydown .text-edit': function(e, template) {
    var $input = $(e.currentTarget);

    var name = $input.val().trim();

    if (e.which !== Utils.ENTER_KEY) return;

    // Now if we've made it to here then actually update the client
    Meteor.call('updateClient', template.data, { name: name }, Utils.handleError);
    template.$('.client').removeClass('editting');
  },

  'blur .text-edit': function(e, template) {
    var $input = $(e.currentTarget);

    // Reset the text field.
    if ($input.val() === '')
      $input.val(template.data.name);

    template.$('.client').removeClass('editting');
  },

  'click .archive': function(e, template) {
    Meteor.call('archiveClient', template.data);
  }

});

