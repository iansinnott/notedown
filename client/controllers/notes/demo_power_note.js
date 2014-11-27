Template.demoPowerNote.events({

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
    DemoNotes.update(template.data._id, { $set: { note: text }});
    template.$('.note').removeClass('editting transition');
  },

  'blur .text-edit': function(e, template) {
    var $textarea = $(e.currentTarget);

    // Reset the text.
    if ($textarea.val() === '')
      $textarea.val(template.data.note);

    template.$('.note').removeClass('editting transition');
  },

  'click .delete': function(e, template) {
    if (!confirm("Are you sure? This can't be undone.")) return false;
    DemoNotes.remove(template.data._id);
  }

});

/**
 * TODO: This is the same for power notes as well as archived power notes. Could
 * stand to be dryed out.
 */
Template.demoPowerNote.helpers({

  /**
   * Return the token (single key) for this power note given the notes type.
   * @return {string} !|?
   */
  token: function() {
    return _.invert(Utils.TOKENS)[this.type];
  }

});
