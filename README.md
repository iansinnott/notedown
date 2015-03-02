# Notedown

_A free note-taking app..._

![Notedown Usage Gif](http://dropsinn.s3.amazonaws.com/notedown-usage.gif)

## What is this?

Notedown is an app for quickly taking notes. I conceived this idea while working as a software consultant. Clients would often continually speak for minutes on end, so I wanted a quick and easy way to take notes about what was being said. 

The app is totally **free** and I currently have no plans to monetize it.

## Usage & Features

Using Notedown is simple: Just type in the large input box and hit enter. A new note will be created.

The more interesting features of Notedown are not so obvious:

* Create _Actions_ be putting a `!` at the beginning of the note. _Actions_ will be orange.
* Create _Questions_ by ending your note with a `?`. _Questions_ will be blue.
* Use Markdown syntax throughout your notes. We parse Markdown as [GitHub Flavored Markdown][gfm].

The best way to get to know the app is simply to use it. The offline version doesn't require login and contains most of the features of the full app. You can find it here:

**[Notedown Offline Mode](http://notedown.us/offline)**

[gfm]: https://help.github.com/articles/github-flavored-markdown/

## Development Notes

### Meteor Gotchas

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

### Already Done

* Preferences (markdown on/off, default sort order, password reset, email settings, etc)
* UI performance improvements (Refactor Meteor methods implementation of create/update)
* Bug Fixes (see Issues)
* ~~Write `/about` copy~~ Nevermind, no need for an about page yet
* `/feedback` page
* Setup mailgun so that I can receive mail sent through the feedback form
* Build out demo
* The main note and client entry input should be a textarea that resizes itself
* Shift+enter doesn't work everywhere
  * As a caveat, this still does not work for power notes in the offline app. This is super strange as it still doesn't work even when using the event handler of the normal power notes (which do work).
* Resetting a note if you edit it and change the text to nothing doesn't work.

### Roadmap

These are all features I'd like to implement, but they are contingent on my own time and how much use I (or anyone else) actually gets out of the app initially.

#### Initial Release (1.0)

* Need to style the markdown within notes to allow for things like buleeted lists and such.

#### Next Release (1.x)

---

**Urgent:**

* Shift enter to add a new line instead of save
* Multiline support using `shift+enter`
* Markdown support (GFM)

---

* Notebooks vs clients
  * Don't use 'clients'. Instead use 'notebooks' to separate notes.
* How-to Guide
  * Simple static page with instructions for basic Note CRUD.
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
* Responsive (this is not particularly difficult, but it just doesn't seem necessary for this app. It was built entirely to scratch my own itch, and mobile usage is not high on my list of prorities)
