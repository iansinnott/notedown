Router.route('/', function() {
  this.render('landing');
});

Router.route('/about', function() {
  this.render('about');
});

Router.route('/contact', function() {
  this.render('contact');
});

Router.route('/demo', function() {
  this.render('demo');
});
