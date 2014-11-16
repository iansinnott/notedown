Template.appLayout.events({

  /**
   * Make sure the dropdown menu is closed when anything else is clicked. This
   * also applies to it's sub menu, meaning I intentionally don't strop
   * propagation so that the menu automatically closes when you click a link.
   * That functionality is all rolled into this one-liner.
   */
  'click': function(e, template) {
    template.$('.dropdown').removeClass('open');
  }

});
