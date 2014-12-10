if (Meteor.isClient) {



/**
 * Todo: this code is duplicated in mini_demo.js, and most (although not all) of
 * this is also duplicated in notes.js.
 */
createDemoNote = function(text, temporary) {
  if (!text)
    throw new Meteor.Error('no-text', 'No text provided.');

  // Make sure there is no extra whitespace messing with the first and last
  // character.
  text = text.trim();

  var prefix = _.first(text),
      suffix = _.last(text),
      type;

  // Note type defaults to 'note'.
  if (Utils.TOKENS.PREFIX[prefix]) {
    type = Utils.TOKENS.PREFIX[prefix];
    text = text.slice(1).trim();
  } else if (Utils.TOKENS.SUFFIX[suffix]) {
    type = Utils.TOKENS.SUFFIX[suffix];
    text = text.slice(0, -1).trim();
  } else {
    type = 'note';
  }

  var atts = {
    type: type,
    note: text,
    created_at: Date.now(),
    updated_at: Date.now()
  };

  if (temporary)
    return TempDemoNotes.insert(atts);
  else
    return DemoNotes.insert(atts);
};

NoteListEvents = {

  'focus #new-note textarea': function(e, template) {
    template.$('#new-note').addClass('focus');
  },

  'blur #new-note textarea': function(e, template) {
    template.$('#new-note').removeClass('focus');
  },

  /**
   * Create a new note when the user presses enter. The new note is not actually
   * created here, the meteor method is called.
   * Note: after cleraing the textarea we set the height to 30 because that
   * seems to be the only way to get the textarea to return to one line.
   */
  'keydown #new-note textarea': function(e, template) {
    var $input   = $(e.currentTarget),
        text     = $input.val().trim(),
        clientId = Session.get('currentClient');

    if (e.which === Utils.ENTER_KEY && !e.shiftKey && text) {
      Meteor.call('note', text, clientId, Utils.logError);
      $input.val('').height(30); // See notes above for explanation
      return false;
    }
  },

  /**
   * No preventing the default here because we actually want the default
   * behavior. Just want to make sure the message doesn't show up again next
   * time the user comes back to the notes page.
   */
  'click .close-redirect': function() {
    Utils.updateProfile({ noClientWarning: false });
  },

  /**
   * Close the dialogue that informs the user about not having clients. I save
   * the fact that hey have seen this message to their profile only after the
   * animation has completed b/c otherwise the reactivity would cause the alert
   * to dissappear before it slid up.
   */
  'click .close': function(e, template) {
    e.preventDefault();
    template.$('.alert-info').slideUp(function() {
      Utils.updateProfile({ noClientWarning: false });
    });
  }
};

DemoNoteListEvents = _.extend({}, NoteListEvents, {
  'keydown #new-note textarea': function(e, template) {
    var input = e.currentTarget,
        text  = input.value.trim();

    if (e.which === Utils.ENTER_KEY && !e.shiftKey && text) {
      createDemoNote(text);
      input.value = '';
    }
  },

  /**
   * Close the dialogue that informs the user about not having clients. I save
   * the fact that hey have seen this message to their profile only after the
   * animation has completed b/c otherwise the reactivity would cause the alert
   * to dissappear before it slid up.
   */
  'click .close': function(e, template) {
    e.preventDefault();
    template.$('.alert-info').slideUp(function() {
      var data = $(e.currentTarget).data('sessionSet')
      Session.set(data, false);
    });
  }
});

/**
 * The all important events object. This defines events for all notes. Some
 * functionality may change for other note types and demo notes, but the
 * majority of the code is the same and can thus be shared this way.
 */
NoteEvents = {

  /**
   * Make the note text editable by showing the hidden textarea. Trigger a
   * resize so that it matches the size of the text.
   */
  'dblclick .text': function(e, template) {
    template.$('.note').addClass('editting');
    template.$('.text-edit')
      .focus()
      .trigger('autosize.resize');
    document.body.offsetWidth; // Force reflow
    template.$('.text-edit').addClass('transition');
  },

  /**
   * Save the updpate to the note. Triggered by hitting the enter key. The text
   * string will be extracted from the textarea, then trimmed and and trailing
   * newlines will be removed.
   */
  'keydown .text-edit': function(e, template) {
    var $textarea = $(e.currentTarget);

    var text = $textarea.val().trim().replace(/\n+$/g,'');

    if (e.which !== Utils.ENTER_KEY || e.shiftKey) return;
    console.log('Other fuck');

    // Reset the value of they entered nothing
    if (!text) {
      $textarea.val(template.data.note);
      template.$('.note').removeClass('editting transition');
      return;
    }

    // Now if we've made it to here then actually update the note
    Meteor.call('updateNote', template.data, { note: text }, Utils.handleError);
    template.$('.note').removeClass('editting transition');
  },

  'blur .text-edit': function(e, template) {
    var $textarea = $(e.currentTarget);

    // Reset the text.
    if ($textarea.val() === '')
      $textarea.val(template.data.note);

    template.$('.note').removeClass('editting transition');
  },

  'click .archive': function(e, template) {
    Meteor.call('archiveNote', template.data);
  }

};

/**
 * Demo note events extend the base note events ojbect, and only provide
 * different functionality. Any changes to the underlying events must by done to
 * NoteEvents.
 */
DemoNoteEvents = _.extend({}, NoteEvents, {

  /*
   * Save the updpate to the note. Triggered by hitting the enter key. The text
   * string will be extracted from the textarea, then trimmed and and trailing
   * newlines will be removed.
   */
  'keydown .text-edit': function(e, template) {
    var $textarea = $(e.currentTarget);

    var text = $textarea.val().trim().replace(/\n+$/g,'');

    if (e.which !== Utils.ENTER_KEY || e.shiftKey) return;

    // Reset the value of they entered nothing
    if (!text) {
      $textarea.val(template.data.note);
      template.$('.note').removeClass('editting transition');
      return;
    }

    // Now if we've made it to here then actually update the note
    Utils.collectionFor(template).update(template.data._id, { $set: { note: text }});
    template.$('.note').removeClass('editting transition');
  },

  'click .delete': function(e, template) {
    return Utils.collectionFor(template).remove(template.data._id);
  }

});

/**
 * Note events are shared among notes, archived notes and power notes.
 */

ArchivedNoteEvents = {

  'click .restore': function(e, view) {
    Meteor.call('restoreNote', view.data);
  },

  'click .delete': function(e, view) {
    if (!confirm("Are you sure? This can't be undone.")) return false;
    Meteor.call('destroyNote', view.data);
  }

};

NoteRendered = function() {
  this.$('.text-edit').autosize({ append: false });
};




}
