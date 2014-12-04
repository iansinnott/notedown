/**
 * GroundDB makes sure demo notes are persisted to local storage instead of only
 * living in memory.
 */
DemoNotes = new GroundDB('demo', { connection: null });
TempDemoNotes = new Meteor.Collection(null);

DemoNoteEvents = {
  'focus #new-note input': function(e, template) {
    template.$('#new-note').addClass('focus');
  },

  'blur #new-note input': function(e, template) {
    template.$('#new-note').removeClass('focus');
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
      Session.set('showDemoAlert', false);
    });
  }
};

createDemoNote = function(text, temporary) {
  if (!text)
    throw new Meteor.Error('no-text', 'No text provided.');

  var type = Utils.TOKENS[text[0]] || 'note',
      atts = {
        type: type,
        note: (type === 'note') ? text : text.slice(1).trim(),
        created_at: Date.now(),
        updated_at: Date.now()
      };

  if (temporary)
    return TempDemoNotes.insert(atts);
  else
    return DemoNotes.insert(atts);
};
