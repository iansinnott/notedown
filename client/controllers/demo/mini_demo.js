function createDemoNote(text, temporary) {
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

  console.log(TempDemoNotes.find().count());

  if (temporary)
    return TempDemoNotes.insert(atts);
  else
    return DemoNotes.insert(atts);
}

Template.miniDemo.helpers({

  notes: function() {
    return TempDemoNotes.find({ type: 'note' }, { sort: { 'created_at': -1 } });
  },

  actions: function() {
    return TempDemoNotes.find({ type: 'action' }, { sort: { 'created_at': -1 } });
  },

  questions: function() {
    return TempDemoNotes.find({ type: 'question' }, { sort: { 'created_at': -1 } });
  },

});

Template.miniDemo.events({
  'focus #new-note input': function(e, template) {
    template.$('#new-note').addClass('focus');
  },

  'blur #new-note input': function(e, template) {
    template.$('#new-note').removeClass('focus');
  },

  'keydown #new-note textarea': function(e, template) {
    var $input = $(e.currentTarget),
        text   = $input.val().trim();

    // If they didn't press enter we don't care
    if (e.which !== Utils.ENTER_KEY) return;

    // There must be text
    if (!text) return false;

    // Hiting shift+enter will insert a linebreak
    if (e.shiftKey) return;

    // Create a new note if we got the enter key without shift and there is text
    // to in the textarea. If the enter key is pressed make sure to return false
    // to keep it form inserting a line break
    createDemoNote(text, true);
    $input.val('');

    // This seems to be the only way of getting the textarea to resize back down
    // to one row right after you hit enter.
    // TODO: Test this in firefox
    $input.height(30);
    return false;
  },

  'click .delete': function(e, template) {
    e.preventDefault();
    return TempDemoNotes.remove(template.data._id);
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
});

Template.miniDemo.rendered = function() {
  this.$('#new-note input').focus();
};
