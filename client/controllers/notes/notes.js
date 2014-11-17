Template.notes.helpers({

  /**
   * All notes belonging to the current user are loaded into minimongo. Here we
   * define the set of notes that should be visible on the /notes page at any
   * point in time. Notes to display match the following criteria: Not archived,
   * are linked to the current client.
   *
   * The current client can be set a number of ways throughout the app, but
   * since Session is a reactive data source we don't have to worry about that.
   * Whenever the current client changes the view will re-render.
   *
   * Note: The cursor must be defined and returned from within a function
   * instead fo directly on the helpers object. Otherwise reactivity will not
   * function.
   */
  notes: function() {
    return Notes.find({
             archived: false,
             client: Session.get('currentClient') || Meteor.userId()
           }, { sort: { 'created_at': -1 } });
  }
});

Template.notes.events({
  'focus #new-note input': function(e, template) {
    template.$('#new-note').addClass('focus');
  },

  'blur #new-note input': function(e, template) {
    template.$('#new-note').removeClass('focus');
  },

  'keydown #new-note input': function(e, template) {
    var input    = e.currentTarget,
        text     = input.value.trim(),
        clientId = Session.get('currentClient');

    if (e.which === Utils.ENTER_KEY && text) {
      Meteor.call('note', text, clientId, Utils.logError);
      input.value = '';
    }
  },

  /**
   * TODO: I need to save the fact that this has been shown already. Save this
   * functionality for until I figure out how I want to write user prefs.
   */
  'click .close': function(e, template) {
    e.preventDefault();
    template.$('.alert-info').slideUp();
  }
});
