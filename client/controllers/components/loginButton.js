Template.loginButton.events({

  'click .dropdown .toggle': function(e, template) {
    e.preventDefault();
    template.$('.dropdown').toggleClass('open');
  },

  'click .logout': function(e) {
    e.preventDefault();
    Meteor.logout();
  }

});
