Template.login.events({
  'submit form': function(e, template) {
    e.preventDefault();

    var $alertMessage = template.$('.alert-error');

    window.template = template;

    $alertMessage.slideUp();

    var email = template.$('#email').val().trim(),
        pass  = template.$('#pass').val().trim();

    if (!email || !pass) {
      $alertMessage
        .html("Please fill out both fields.")
        .slideDown();
      return false;
    }

    Meteor.loginWithPassword(email, pass, function(err) {
      if (err) {
        $alertMessage
          .html(err.reason)
          .slideDown();
        return false;
      }

      Router.go('/notes');
    });

  }
});

Template.login.rendered = function() {
  console.log('hey we loggedin'); // debug
};
