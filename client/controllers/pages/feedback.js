Template.feedback.events({

  /**
   * Submit the feedback form. Send the user submition to Ian using the meteor
   * method.
   */
  'submit form': function(e, template) {
    e.preventDefault();

    var $alertMessage = template.$('.alert-error');

    $alertMessage.slideUp();

    var from    = template.$('#email').val().trim(),
        message = template.$('#message').val().trim();

    if (!from || !message) {
      $alertMessage
        .html("Please fill out both fields.")
        .slideDown();
      return false;
    }

    Meteor.call('sendEmail', from, message, handleError);

    // Clear the input fields.
    template.$('#email').val('');
    template.$('#message').val('');

    return false;
  }

});

Template.feedback.rendered = function() {
  this.$('#message').autosize({ append: false });
};

/**
 * Handle an error by showing the user the reason for the error and sliding down
 * the div that contains said text.
 */
function handleError(err, $div) {
  if (err) {
    console.error(err.reason);
    $('.alert-error')
      .html(err.reason)
      .slideDown();
  }

  $('.alert-success')
    .html("Thanks for the feedback. We'll be in touch.")
    .slideDown();
}
