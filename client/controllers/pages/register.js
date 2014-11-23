// TODO: This is not dry. The login form uses nearly identical logic with the
// only difference being createUser vs loginWithEmail. Could stand to be
// refactored.
Template.register.events({
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

    Accounts.createUser({
      email: email,
      password: pass,
      profile: {

        // By default, show a warning when there are no clients yet
        noClientWarning: true

      }
    }, handleError);

    return false;
  }
});

/**
 * Handle an error by showing the user the reason for the error and sliding down
 * the div that contains said text.
 *
 * TODO: This logic is duplicated in the login form
 */
function handleError(err, $div) {
  if (!err) return;

  console.error(err.reason);
  $('.alert-error')
    .html(err.reason)
    .slideDown();
}
