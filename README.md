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

## Already Done

* Preferences (markdown on/off, default sort order, password reset, email settings, etc)
* UI performance improvements (Refactor Meteor methods implementation of create/update)
* Bug Fixes (see Issues)
* ~~Write `/about` copy~~ Nevermind, no need for an about page yet
* `/feedback` page

## Roadmap

These are all features I'd like to implement, but they are contingent on my own time and how much use I (or anyone else) actually gets out of the app initially.

#### Initial Release (1.0)

* Setup mailgun so that I can receive mail sent through the feedback form
* Build out demo

#### Next Release (1.x)

* How-to Guide
  * Simple static page with instructions for basic Note CRUD.
* Shift enter to add a new line instead of save
* The main note and client entry input should be a textarea that resizes itself
* Markdown support (GHFM)
* Multiline support using `shift+enter`
* Settings Page
  * Password Changing
* Password Reset
* Email Verification
* Data export
* Add a separator between notes added on different dates
* Instant search
  * Fuzzy finding
  * Highlighting of search terms in matching notes
* HTTPS on all pages (self-rolled)


#### Wish List

* Facebook-esque multiline support. "Enter creates new note" checkbox. Defaults to shift+enter adds newline. When unchecked must click button to submit. Enter adds newline.
* `notedown.<tld>` domain name. See what TLDs are available.
* Commercial HTTPS
* Database Backup (Likely to AWS Glacier)
  * This will likely be harder to implement because I don't have a background in security. 
* Relative dates for notes and clients
* Guided tour
* Pagination on archives page
* Reordering (dragging. Will need to implement custom order)
* Sorting (custom order, date added, etc)
* GitHub, Facebook login
* Custom 'types' (choose a token, pick a color, then all notes prefixed with #{token} are set to that type)
* Add a photo to a note (drag and drop)
* Translation/Internationalization
* Collaboration
