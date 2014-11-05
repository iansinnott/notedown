Template.contact.events({
  'submit form': function (e) {
    e.preventDefault();
    $('.slide-down').hide();
    $('.alert-success').html('Hey nice form submission.').slideDown();
  }
});
