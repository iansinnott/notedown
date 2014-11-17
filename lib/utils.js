Utils = {

  /**
   * A simple shortcut. Easier to remember.
   */
  ENTER_KEY: 13,

  /**
   * Any keys that correspond to various types of power notes.
   */
  TOKENS: {
    '!': 'action',
    '?': 'question'
  },

  /**
   * Log a meteor error to the console in a human-readable form.
   */
  logError: function(err) {
    if (err) return console.error(err.reason);
  }

};
