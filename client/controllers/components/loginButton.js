Template.loginButton.events({

  'click .dropdown .toggle': function(e, template) {
    e.preventDefault();
    e.stopPropagation();
    template.$('.dropdown').toggleClass('open');
  },

  'click .logout': function() {
    Meteor.logout();
  }

});
