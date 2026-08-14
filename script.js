const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.id = crypto.randomUUID();
}

Book.prototype.toggleRead = function () {
  this.read = !this.read;
};

function addBookToLibrary(title, author, pages, read) {
  const book = new Book(title, author, pages, read);
  myLibrary.push(book);
}

function hueFromId(id) {
  let hash = 0;
  for (const character of id) {
    hash = (hash * 31 + character.charCodeAt(0)) % 360;
  }
  return hash;
}

function displayBooks() {
  const container = document.getElementById("books-container");
  container.replaceChildren();

  myLibrary.forEach((book) => {
    const card = document.createElement("div");
    card.classList.add("book-card");
    card.dataset.id = book.id;
    card.style.setProperty("--cover-hue", hueFromId(book.id));

    const details = [
      `Book Title: ${book.title}`,
      `Author: ${book.author}`,
      `Pages: ${book.pages}`,
      `Read: ${book.read ? "Yes" : "No"}`,
    ];

    details.forEach((detail) => {
      const line = document.createElement("p");
      line.textContent = detail;
      card.appendChild(line);
    });

    const toggleButton = document.createElement("button");
    toggleButton.dataset.action = "toggle";
    toggleButton.textContent = book.read ? "Mark Unread" : "Mark Read";

    const removeButton = document.createElement("button");
    removeButton.dataset.action = "remove";
    removeButton.textContent = "Remove";

    const actions = document.createElement("div");
    actions.classList.add("card-actions");
    actions.append(toggleButton, removeButton);
    card.appendChild(actions);

    container.appendChild(card);
  });
}

addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, true);
addBookToLibrary("Dune", "Frank Herbert", 412, false);
addBookToLibrary("Neuromancer", "William Gibson", 271, false);
displayBooks();

const bookDialog = document.getElementById("book-dialog");
const bookForm = document.getElementById("book-form");

document.getElementById("new-book-button").addEventListener("click", () => {
  bookDialog.showModal();
});

document.getElementById("cancel-button").addEventListener("click", () => {
  bookDialog.close();
});

document
  .getElementById("books-container")
  .addEventListener("click", (event) => {
    const button = event.target.closest("button[data-action]");
    if (!button) return;

    const id = button.closest(".book-card").dataset.id;
    const index = myLibrary.findIndex((book) => book.id === id);
    if (index === -1) return;

    if (button.dataset.action === "toggle") {
      myLibrary[index].toggleRead();
    } else {
      myLibrary.splice(index, 1);
    }

    displayBooks();
  });

bookForm.addEventListener("submit", (event) => {
  event.preventDefault();

  addBookToLibrary(
    document.getElementById("title").value,
    document.getElementById("author").value,
    Number(document.getElementById("pages").value),
    document.getElementById("read").checked,
  );

  displayBooks();
  bookForm.reset();
  bookDialog.close();
});
