/**
 * Note events are shared among notes, archived notes and power notes.
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

    if (e.which !== Utils.ENTER_KEY) return;

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
    console.log('called archive'); // debug
    Meteor.call('archiveNote', template.data);
  }

};

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
