Template.login.events({
  'submit form': function(e, template) {
    e.preventDefault();

    var $alertMessage = template.$('.alert-error');

    $alertMessage.slideUp();

    var email = template.$('#email').val().trim(),
        pass  = template.$('#pass').val().trim();

    if (!email || !pass) {
      $alertMessage
        .html("Please fill out both fields.")
        .slideDown();
      return false;
    }

    Meteor.loginWithPassword(email, pass, handleError);

    // Redirection upon success is handled reactively by the router. I.e. when
    // Meteor.user() changes as the user logs in the routers computation will be
    // invalidated and the router itself will redirect to the correct page. As
    // such, we simply return false to prevent the form from doing anything at
    // all.
    return false;
  }
});

/**
 * Handle an error by showing the user the reason for the error and sliding down
 * the div that contains said text.
 */
function handleError(err, $div) {
  if (!err) return;

  console.log(err.reason); // debug
  $('.alert-error')
    .html(err.reason)
    .slideDown();
}
