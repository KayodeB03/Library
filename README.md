# Library

A small book-tracking app built with vanilla HTML, CSS, and JavaScript. Books are
stored as objects in an array and rendered to the page as coloured "book cover"
cards. You can add books through a modal form, toggle whether you've read them,
and remove them from the library.

This is an implementation of The Odin Project's Library assignment.

## Features

- Add books via a `<dialog>` modal with title, author, page count, and read status
- Native form validation (`required`, `min="1"`) before anything reaches the array
- Toggle a book's read status
- Remove a book from the library
- Each cover gets its own colour, derived from the book's id
- Responsive grid that reflows from one column to many without media queries

## Files

| File         | Purpose                                                         |
| ------------ | --------------------------------------------------------------- |
| `index.html` | Page structure: header, card container, and the add-book dialog |
| `script.js`  | Data model and all rendering / event logic                      |
| `style.css`  | Card, header, and dialog styling                                |

## Basics

Books are plain objects created by a `Book` constructor and pushed into a single
`myLibrary` array. Every book is assigned a unique id by `crypto.randomUUID()`
inside the constructor, so callers cannot supply a duplicate or malformed one.

```js
function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.id = crypto.randomUUID();
}
```

`toggleRead` lives on `Book.prototype` rather than inside the constructor, so a
single function is shared by every instance instead of each book carrying its own
copy.
