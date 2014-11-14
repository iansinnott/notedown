Template.login.events({
  'submit form': function(e, template) {
    e.preventDefault();

    var $alertMessage = template.$('.alert-error');

    $alertMessage.slideUp();

    var email = template.$('#email').val().trim(),
        pass  = template.$('#pass').val().trim();

    if (!email || !pass) {
      console.log("Didn't fill it all out"); // debug
      $alertMessage
        .html("Please fill out both fields.")
        .slideDown();
      return false;
    }

    Meteor.loginWithPassword(email, pass, function(err) {
      if (err) {
        console.log(err.reason); // debug
        $alertMessage
          .html(err.reason)
          .slideDown();
        return false;
      }

      console.log('would normally redirect here'); // debug
      // Router.go('/notes');
    });

    console.log('return false'); // debug
    return false;

  }
});
