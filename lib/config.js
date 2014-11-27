// Session is only defined on the client
if (Meteor.isClient) {

  /**
   * The help message that appears above your notes if you have no clients. This
   * shows by default but will not show again after it is closed the first time.
   */
  Session.setDefault('showClientHelp', true);

  /**
   * Whether or not to show the alert message that explains why a user should
   * make a real account.
   */
  Session.setDefault('showDemoAlert', true);

  /**
   * The currently selected client. Clients can be selected from the dropdown list
   * in the header, or by other means such as clicking a client in the client list
   * and being brought to the notes page showing only notes for that client.
   */
  Session.setDefault('currentClient', null);

}
