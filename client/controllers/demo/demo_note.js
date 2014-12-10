/**
 * Find the collecton belloning to a given note.
 * @return {object} Meteor.Collection
 */
function collectionFor(template) {
  console.log(template); // debug
  if (DemoNotes.find(template.data._id).count())
    return DemoNotes;
  else
    return TempDemoNotes;
}

var DemoNoteEvents = {

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
    collectionFor(template).update(template.data._id, { $set: { note: text }});
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
    return collectionFor(template).remove(template.data._id);
  }

}

Template.demoNote.events(DemoNoteEvents)
Template.demoPowerNote.events(DemoNoteEvents)
Template.demoNote.rendered = NoteRendered;
Template.demoPowerNote.rendered = NoteRendered;
