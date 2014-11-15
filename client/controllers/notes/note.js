var ENTER_KEY = 13;
Template.note.events({

  'dblclick .text': function(e, template) {
    template.$('.note').addClass('editting');
    template.$('.text-edit').focus();
  },

  'keydown .text-edit': function(e, template) {
    var $input = $(e.currentTarget);

    var text = $input.val().trim();
      // .replace(/(<([^>]+)>)/ig,'');

    if (e.which !== ENTER_KEY) return;

    // Now if we've made it to here then actually update the note
    Meteor.call('update', template.data, { note: text }, handleError);
    template.$('.note').removeClass('editting');
  },

  'blur .text-edit': function(e, template) {
    console.log('BLUR fired'); // debug
    var $input = $(e.currentTarget);

    console.log('VAL: ' + $input.val()); // debug

    // Reset the text.
    if ($input.val() === '')
      $input.val(template.data.note);

    template.$('.note').removeClass('editting');
  },

  'click .delete': function(e, template) {
    Meteor.call('archive', template.data);
  }

});

/**
 * A simple error handler for debugging.
 */
function handleError(err) {
  if (!err) return;
  console.error(err.reason);
}
