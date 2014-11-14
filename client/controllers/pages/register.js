Template.register.events({
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

    Accounts.createUser({ email: email, password: pass }, function(err) {
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
