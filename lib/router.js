
/**
 * Redirect to notes if the user is already logged in.
 */
function redirectIfLoggedIn() {
  if (Meteor.user())
    this.redirect('/notes/me');
  else
    this.next();
}

/**
 * Make sure a user is logged in before allowing them to continue.
 */
function authenticateUser() {
  if (!(Meteor.loggingIn() || Meteor.user()))
    this.redirect('/login');
  else
    this.next();
}

/**
 * These pages will all be protected from unauthorized access. Anything not in
 * this list can be viewed by the general public without logging in.
 */
var protectedPages = [
  'notes',
  'clients',
  'archive'
];

// Configuration
Router.configure({
  layoutTemplate: 'appLayout',
  loadingTemplate: 'loading',
  waitOn: function() {
    return [
      Meteor.subscribe('notes'),
      Meteor.subscribe('clients')
    ];
  }
});

Router.onBeforeAction(redirectIfLoggedIn, { only: ['login', 'register'] });
Router.onBeforeAction(authenticateUser, { only: protectedPages });

// Routes
Router.route('/', function() {
  this.layout('landingLayout');
  this.render('landing');
});

// Both /login and /notes need a loading indicator. /notes most of all because
// it has to fetch all the users notes, but login as well because it needs to
// wait for the user to try to log in before it renders a route.

Router.route('/notes', function() {
  this.render('notesHeader', { to: 'header' });
  this.render('notes');
});

Router.route('/archive', function() {
  this.render('notesHeader', { to: 'header' });
  this.render('archive');
});

Router.route('/notes/:clientId', function() {
  var clientId = this.params.clientId;

  if (clientId === 'me')
    Session.set('currentClient', Meteor.userId());
  else
    Session.set('currentClient', clientId);

  this.render('notesHeader', { to: 'header' });
  this.render('notes');
});

Router.route('/archive/:clientId', function() {
  var clientId = this.params.clientId;

  if (clientId === 'me')
    Session.set('currentClient', Meteor.userId());
  else
    Session.set('currentClient', clientId);

  this.render('notesHeader', { to: 'header' });
  this.render('archive');
});

Router.route('/clients', function() {
  this.render('clientsHeader', { to: 'header' });
  this.render('clients');
});

// Pages
Router.route('/login');
Router.route('/register');
Router.route('/feedback');
Router.route('/demo');
