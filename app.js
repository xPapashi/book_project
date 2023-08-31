//Creating an array for the books
const myLibrary = [];

//Searching for button class
const btn = document.querySelector(".modal-btn");

//Book constructor
function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = () => {
    return `The ${title} by ${author}, ${pages} pages, ${read}`;
  };
}

//Form, Inputs and Buttons
const form = document.querySelector('form');
const submitBtn = document.querySelector(".submit-btn");
const bTitle = document.getElementById("title");
const bAuthor = document.getElementById("author");
const bPages = document.getElementById("pages");
const bRead = document.getElementById("read");

//Adding books to the myLibrary array
function addBookToLibrary() {
  const dummyBook = new Book(
    bTitle.value, 
    bAuthor.value, 
    bPages.value, 
    bRead.checked);
  myLibrary.push(dummyBook);
  console.log(myLibrary);
  displayBook();
  // let title = prompt("Please enter the Title of the book");
  // let author = prompt("Please enter an Author ofx the book");
  // let pages = parseInt(prompt("Please enter the amount pages of pages"));
  // myLibrary.push(title, author, pages);
  // displayBook();
}

function displayBook() {
  const cards = document.querySelector(".cards");
  cards.innerHTML = "";

  for (let i = 0; i < myLibrary.length; i++) {
    const book = myLibrary[i];

    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `      
      <h3>${book.title}</h3>
      <div class='details'>
        <p>Author: ${book.author}</p>
        <p>Pages: ${book.pages}</p>
        <p>Read: ${book.read ? "Yes" : "No"}</p>
      </div>`;

    cards.appendChild(card);
  }
}

/* MODAL */

const modal = document.querySelector(".modal-popup");
const overlay = document.querySelector(".overlay");

//Opening modal
function openModal() {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
}

//Closing modal
function closeModal() {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
}

//Listen for a click on "Add a book" button
btn.addEventListener("click", openModal);

//Listen for a click on the overlay
overlay.addEventListener("click", closeModal);

//Listen for a keydown
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

submitBtn.addEventListener("click", function (e) {
  addBookToLibrary();
  e.preventDefault();
  closeModal();
  form.reset();
});

//Initially display books
displayBook();
