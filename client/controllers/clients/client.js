/**
 * The client row.
 *
 * TODO: This is not dry. IT's basically the same as the functionality included
 * for a note row.
 */
Template.client.events({

  'dblclick .text': function(e, template) {
    template.$('.client').addClass('editting');
    template.$('.text-edit').focus();
  },

  'keydown .text-edit': function(e, template) {
    var $input = $(e.currentTarget);

    var name = $input.val().trim();
      // .replace(/(<([^>]+)>)/ig,'');

    if (e.which !== Utils.ENTER_KEY) return;

    // Now if we've made it to here then actually update the client
    Meteor.call('updateClient', template.data, { name: name }, Utils.handleError);
    template.$('.client').removeClass('editting');
  },

  'blur .text-edit': function(e, template) {
    console.log('BLUR fired'); // debug
    var $input = $(e.currentTarget);

    console.log('VAL: ' + $input.val()); // debug

    // Reset the text field.
    if ($input.val() === '')
      $input.val(template.data.name);

    template.$('.client').removeClass('editting');
  },

  'click .delete': function(e, template) {
    Meteor.call('archiveClient', template.data);
  }

});

