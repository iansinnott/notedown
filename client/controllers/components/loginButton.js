Template.loginButton.events({
  'click .logout': function(e) {
    e.preventDefault();
    Meteor.logout();
  }
});
