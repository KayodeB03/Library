const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.id = crypto.randomUUID();
}

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

  myLibrary.forEach((book) => {
    const card = document.createElement("div");
    card.classList.add("book-card");
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

    container.appendChild(card);
  });
}

const newBookButton = document.getElementById("new-book-button");
newBookButton.addEventListener("click", () => {
  console.log("New book button clicked");
});

addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, true);
addBookToLibrary("Dune", "Frank Herbert", 412, false);
addBookToLibrary("Neuromancer", "William Gibson", 271, false);
console.log(myLibrary);
displayBooks();
