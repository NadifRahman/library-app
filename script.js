const myLibrary = [];
let submitBtn = document.querySelector(`#submit-book-btn`);
let libraryContainer = document.querySelector("#library-container");
let submitBookBtn = document.querySelector(`#submit-book-btn`);
//name --> string, author --> string, numberOfPages --> string, hasRead --> boolean
function Book(name, author, numberOfPages, hasRead) {
    this.name = name;
    this.author = author;
    this.numberOfPages = numberOfPages
    this.hasRead = hasRead;
}

function updateIndices() { //updates the data-index attribute of each element
    const bookcards = document.querySelectorAll(".bookcard")
    bookcards.forEach((card, index) => {
        card.setAttribute('data-index', index);
    });
}

//name --> string, author --> string, numberOfPages --> string, hasRead --> boolean
function addBookToLibrary(name, author, numberOfPages, hasRead) {
    let book = new Book(name, author, numberOfPages, hasRead);
    let bookcard = document.createElement("div")
    bookcard.classList.add("bookcard");
    bookcard.setAttribute("data-index", myLibrary.length);

    let booktitle = document.createElement("div");
    booktitle.classList.add("book-title");
    booktitle.textContent = name;
    
    let bookauthor = document.createElement("div")
    bookauthor.classList.add("book-author");
    bookauthor.textContent = author;
    let readStatus = document.createElement("div");
    readStatus.classList.add("has-read");
    readStatus.textContent = hasRead ? "Read" : "Not Read";

    let pages =  document.createElement("div");
    pages.classList.add("number-of-pages");
    pages.textContent = numberOfPages;

    let deleteBookBtn = document.createElement("button")
    deleteBookBtn.classList.add("delete-book");
    deleteBookBtn.textContent = "Delete book"
    deleteBookBtn.addEventListener('click', () => {
        myLibrary.splice(bookcard.getAttribute(`data-index`), 1);
        bookcard.remove();
        updateIndices();
    });

    let readToggleBtn = document.createElement("button");
    readToggleBtn.classList.add("read-status")
    readToggleBtn.textContent = "Change Read Status";
    readToggleBtn.addEventListener('click', () => {
        switch(readStatus.textContent) {
            case "Read": 
            book.hasRead = false;
            readStatus.textContent = "Not Read";
            break;
            case "Not Read":
                book.hasRead = true;
                readStatus.textContent = "Read";
        }
    })

    bookcard.appendChild(booktitle);
    bookcard.appendChild(bookauthor);
    bookcard.appendChild(readStatus);
    bookcard.appendChild(pages);
    bookcard.appendChild(deleteBookBtn);
    bookcard.appendChild(readToggleBtn);
    console.log(libraryContainer);
    libraryContainer.appendChild(bookcard);
    
    myLibrary.push(book);

}

submitBookBtn.addEventListener('click', (e) => {
    e.preventDefault();
    addBookToLibrary(document.querySelector(`#book-title`).value,
                    document.querySelector(`#book-author`).value,
                    document.querySelector(`#number-of-pages`).value,
                    Boolean(document.querySelector(`input[name="read"]:checked`).value === `true`));

});
