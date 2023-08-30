//Creating an array for the books
const myLibrary = [
  "Story of an Apple", "George Bush", 420,
  "Mercenary Ghost", "Chris Brown", 96
];

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

//Adding books to the myLibrary array
function addBookToLibrary() {
    let title = prompt("Please enter the Title of the book");
    let author = prompt("Please enter an Author of the book");
    let pages = parseInt(prompt("Please enter the amount pages of pages"));
    myLibrary.push(title, author, pages);
    displayBook();
}

function displayBook() {
  const cards = document.querySelector(".cards");
  cards.innerHTML = "";

  for (let i = 0; i < myLibrary.length; i += 3) {
    const title = myLibrary[i];
    const author = myLibrary[i + 1];
    const pages = myLibrary[i + 2];

    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `      
      <h3>${title}</h3>
      <div class='details'>
      <p>Author: ${author}</p>
      <p>Pages: ${pages}</p>
      </div>`;

    cards.appendChild(card);
  }
}

//Initially display books
displayBook();

//Listen for button click and call "addBookToLibrary"
btn.addEventListener("click", addBookToLibrary);