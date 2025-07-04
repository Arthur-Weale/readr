const myLibrary = [];

function Book( title, author, pages, read){
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(title, author, pages, read){
    const newBook = new Book( title, author,  pages, read)
    console.log(newBook.title, newBook.id);
    myLibrary.push(newBook)
}

addBookToLibrary( 'The wall', 'Arthur Spwein', 300, true)
addBookToLibrary( 'The wall secrets', 'Arthur Spwein', 366, true)
//console.log(myLibrary);

function displayBook(){
    myLibrary.forEach((book)=> {
        console.log(JSON.stringify(book, null, 2))
        //console.log(book.title)
    })
}

displayBook();