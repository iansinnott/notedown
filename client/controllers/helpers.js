/**
 * Global Template Helpers
 *
 * Note that 'this' will be set to the context of wherevere the helper is
 * called. See formatDate bellow for more on this.
 */

/**
 * Return a formated date based on the timestamp of the current note.
 *
 * Note: This must be called in the context of a single note ojbect so that
 * created_at is defined and an integer.
 */
Template.registerHelper('formatDate', function() {
  return moment(this.created_at).format('MM-DD');
});
