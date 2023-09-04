//Creating an array for the books
const myLibrary = [
  {
    title: "Harry Potter",
    author: "J. K. Rowling",
    pages: "250",
    read: false,
  },
];

//Searching for button class
const btn = document.querySelector(".modal-btn");
const cards = document.querySelector(".cards");

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
const form = document.querySelector("form");
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
    bRead.checked
  );
  myLibrary.push(dummyBook);

  displayBook();
}

function removeBookFromLibrary(index) {
  myLibrary.splice(index, 1);
  displayBook();
}

function displayBook() {
  if (myLibrary.length > 0) {
    cards.innerHTML = "";
  }

  for (let i = 0; i < myLibrary.length; i++) {
    const book = myLibrary[i];

    const card = document.createElement("div");
    card.classList.add("card");
    card.setAttribute("data-index", i);
    card.innerHTML = `      
      <h3>${book.title}</h3>
      <div class='details'>
        <p>Author: ${book.author}</p>
        <p>Pages: ${book.pages}</p>
        <p>Read: ${book.read ? "Yes" : "No"}</p>
      </div>
      <div class="buttons">
        <button class='rmRead'>
          <span class="material-symbols-outlined">
          import_contacts
          </span>
        </button>
        <button class='rmCard'>
          <span class="material-symbols-outlined">
              delete_forever
          </span>  
        </button>
      </div>`;

    cards.appendChild(card);
  }
  removeCards();
}

function removeCards() {
  const removeCards = document.querySelectorAll(".rmCard");

  removeCards.forEach((button) => {
    button.addEventListener("click", function () {
      const buttonsClass = button.parentElement;
      const cardClass = buttonsClass.parentElement;
      const index = cardClass.getAttribute("data-index");
      console.log(`Your index is ${index}`);
      cardClass.remove();
      removeBookFromLibrary(index);
      checkEmptyCards();
    });
  });
}

/* MODAL */

const modal = document.querySelector(".modal-popup");
const overlay = document.querySelector(".overlay");

//Opening modal
function openModal() {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
  bTitle.focus();
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

/* CARDS */
function checkEmptyCards() {
  if (!cards.hasChildNodes()) {
    cards.innerHTML = "<p>There are no book at the moment...</p>";
  }
}

//Initially display books
displayBook();
checkEmptyCards();
