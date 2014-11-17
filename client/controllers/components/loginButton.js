Template.loginButton.events({

  'click .dropdown .toggle': function(e, template) {
    e.preventDefault();
    e.stopPropagation();
    template.$('.dropdown').toggleClass('open');
  },

  /**
   * Logout and unset the current client.
   */
  'click .logout': function() {
    Meteor.logout(function() {
      Session.set('currentClient', null);
    });
  }

});
