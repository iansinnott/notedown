# Notedown

_A note-taking app..._

## Meteor Gotchas

* Definitions should be placed under `lib/`. For example, I had initially defined `collections/` at the root level, but they were then getting loaded after I needed to use them. Lame.
* Look at the following code:

    ```js
    // Seems to work at first, but isn't reactive
    Template.name.helpers({
      someCollection: SomeCollection.find({ key: Session.get('value') })
    });

    // Works. Fully reactive
    Template.name.helpers({
      someCollection: function() {
        return SomeCollection.find({ key: Session.get('value') });
      }
    });
    ```

    The bullet point is, reactivity _will not function_ unless the reactive data source (in this case the session & the mongo cursor) is wrapped in a function. If it is simply defined on the object we won't get reactivity. 
