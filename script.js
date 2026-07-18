const myLibrary = [];

function Book(author, title, pages, read) {

    if (!new.target){
        throw new Error("Use new keyword to call the function as constructor");
    };

    this.id=crypto.randomUUID();
    this.author=author;
    this.title=title;
    this.pages=pages;
    this.read = read;
}

function addBookToLibrary(author, title, pages, read) {

    const book = new Book(author, title, pages, read);
    myLibrary.push(book);
    return book;    
}

for (let i=1; i<=15;i++){

    addBookToLibrary(
        `Author ${i}`,
        `Title ${i}`,
        100+i,
        Math.random() <0.5
    );
}

function removeBook(library, id){

    for (let i=0; i<library.length;i++){
        if (library[i].id===id){
            library.splice(i, 1);
            break;
        }
    }
}

function toggleRead(library, id){

    for (let i=0; i<library.length;i++){
        if (library[i].id===id){
            if (library[i].read===true){
                library[i].read=!library[i].read;
                break;
            }
        }
    }
}

//  DOM

function displayBook(bookToAdd){

    const books=document.querySelector(".books");

    const book=document.createElement("div");
    book.classList.add("book");

    const icon=document.createElement("i");
    icon.classList.add("mdi", "mdi-book-open-page-variant");

    const title=document.createElement("h2");
    title.classList.add("book-title");

    const author=document.createElement("p");
    author.classList.add("book-author");

    const pages=document.createElement("p");
    pages.classList.add("book-pages");

    const readDiv=document.createElement("div");
    readDiv.classList.add("book-read");

    const readText=document.createElement("p");
    readText.classList.add("read-text");

    const readButton=document.createElement("button");
    readButton.classList.add("read-button");

    const readIcon=document.createElement("i");
    readIcon.classList.add("mdi", "mdi-refresh", "read-icon");

    const removeButton=document.createElement("button");
    removeButton.classList.add("remove-button");
    removeButton.textContent="Remove";

    title.textContent=`${bookToAdd.title}`;
    author.textContent=`${bookToAdd.author}`;
    pages.textContent=`${bookToAdd.pages}`;
    readText.textContent=`${bookToAdd.read ? 'already read' : 'not read yet'}`;

    book.append(icon);
    book.append(title);
    book.append(author);
    book.append(pages);
    readDiv.append(readText);
    readButton.append(readIcon);
    readDiv.append(readButton);
    book.append(readDiv);
    book.append(removeButton);
    books.append(book);

    readButton.addEventListener('click', () => {
        bookToAdd.read=!bookToAdd.read;
        readText.textContent=`${bookToAdd.read ? 'already read' : 'not read yet'}`;
    })

    removeButton.addEventListener('click', () => {
        removeBook(myLibrary, bookToAdd.id);
        book.remove();
    })
}

const form=document.querySelector("form");

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const title=document.querySelector("#title").value;
    const author=document.querySelector("#author").value;
    const pages=document.querySelector("#pages").value;
    const readornot=(document.querySelector("#read").value);
    if (readornot.toLocaleLowerCase() === "yes"){
        read=true;
    } else {
        read=false;
    }

    const book=addBookToLibrary(author, title, pages, read);
    displayBook(book);

})

myLibrary.forEach(displayBook);

// Event Listeners

