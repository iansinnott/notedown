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

## Roadmap

These are all features I'd like to implement, but they are contingent on my own time and how much use I (or anyone else) actually gets out of the app initially.

* Shift enter to add a new line instead of save
* Markdown support (GHFM)
* Preferences (markdown on/off, default sort order, password reset, email settings, etc)
* Reordering (dragging)
* Sorting (custom order, date added, etc)
* Add a photo to a note (drag and drop)
* Data export
* Pagination on archives page
* Guided tour
* Custom 'types' (choose a token, pick a color, then all notes prefixed with #{token} are set to that type)
* Relative dates for notes and clients
* Add a separator between notes added on different dates
* Instant search
  * Fuzzy finding
  * Highlighting of search terms in matching notes

