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

function formValidation() {
  const title = bTitle.value.trim();
  const author = bAuthor.value.trim();
  const pages = bPages.value.trim();

  if (title === "" || author === "" || pages === "") {
    return false;
  } else if (pages > 25000) {
    return false;
  }
  return true;
}

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

//Remove object from array
function removeBookFromLibrary(index) {
  myLibrary.splice(index, 1);
  displayBook();
}

//Display books on the page
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
  changeReadStatus();
}

//Change read status
function changeReadStatus() {
  const readCards = document.querySelectorAll(".rmRead");

  readCards.forEach((button) => {
    button.addEventListener("click", function () {
      const buttonsClass = button.parentElement;
      const cardClass = buttonsClass.parentElement;
      const index = cardClass.getAttribute("data-index");

      console.log(myLibrary[index].read);
      myLibrary[index].read = !myLibrary[index].read;
      displayBook();
    });
  });
}

//Remove cards from the page
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
btn.addEventListener("click", function () {
  openModal();
  window.scrollTo(0, 0);
});

//Listen for a click on the overlay
overlay.addEventListener("click", closeModal);

//Listen for a keydown
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

//Add book from form and clear it
submitBtn.addEventListener("click", function (e) {
  if (formValidation()) {
    addBookToLibrary();
    e.preventDefault();
    closeModal();
    form.reset();
    window.scrollTo(0, 620);
  }
});

/* CARDS */
function checkEmptyCards() {
  if (!cards.hasChildNodes()) {
    cards.innerHTML = "<p>There are no books at the moment...</p>";
  }
}

/* Scroll Down Event */
const scrollDown = document.querySelector(".scroll-down");

scrollDown.addEventListener("click", () => {
  window.scrollTo(0, 620);
});

/* Scroll Up Event */
const scrollUp = document.querySelector(".scroll-up");

scrollUp.addEventListener("click", () => {
  window.scrollTo(0, 0);
});

window.onscroll = function () {
  console.log("SCROLLING");
  scrollUp.style.display = window.scrollY > 200 ? "block" : "none";
};

//Initially display books
displayBook();
checkEmptyCards();
