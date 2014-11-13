// Configuration
Router.configure({
  layoutTemplate: 'appLayout'
});

// Routes
Router.route('/', function() {
  this.render('landing');
});

// Both /login and /notes need a loading indicator. /notes most of all because
// it has to fetch all the users notes, but login as well because it needs to
// wait for the user to try to log in before it renders a route.

// Improve: This feels like it could be more elegant, but it works for now.
Router.route('/notes', {
  onBeforeAction: function() {
    if (!(Meteor.loggingIn() || Meteor.user()))
      this.redirect('/login');
    else
      this.next();
  }
});

// Improve: This isn't very dry.
Router.route('/login', {
  onBeforeAction: function() {
    if (Meteor.loggingIn() || Meteor.user())
      this.redirect('/notes');
    else
      this.next();
  }
});

Router.route('/register');
Router.route('/feedback');
Router.route('/demo');
