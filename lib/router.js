// Configuration
Router.configure({
  layoutTemplate: 'appLayout'
});

// Routes
Router.route('/', function() {
  if (Meteor.user())
    this.render('notes');
  else
    this.render('landing');
});

Router.route('/feedback', function() {
  this.render('feedback');
});

Router.route('/demo', function() {
  this.render('demo');
});
