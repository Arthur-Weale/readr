const cardContainer = document.querySelector('.card-container');
const bookCard = document.querySelector('.book-card');
//const checkboxState = document.querySelector('#readUnreadAttribute');

const myLibrary = [];

function Book( title, author, pages, read){
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

//Creating book prototype to handle read status
Book.prototype.getCheckedAttribute= function (){
    return this.read ? 'checked' : '';
}

Book.prototype.getLabel= function (){
    return this.read ? 'Read' : 'Unread';
}

Book.prototype.toggleReadState = function (newId){
    if(this.id === newId) {
        this.read = !this.read
        console.log(this.read)
    } ;
}

function addBookToLibrary(title, author, pages, read){
    const newBook = new Book( title, author,  pages, read)
    console.log(newBook.title, newBook.id);
    myLibrary.push(newBook)
}

addBookToLibrary( 'The wall', 'Arthur Spwein', 300, true)
addBookToLibrary( 'The wall secrets', 'Arthur Spwein', 360, false)

function displayBook(){
    myLibrary.forEach((book)=> {
        console.log(JSON.stringify(book, null, 2))
        cardContainer.innerHTML += `
            <div class="book-card">
            <h3 class="book-title">Title: ${book.title}</h3>
            <p class="book-author">Author: ${book.author}</p>
            <p class="book-pages">Page: ${book.pages}</p>
            <label for="read">${book.getLabel()} <input type="checkbox" class="readUnreadAttribute" data-id='${book.id}' ${book.getCheckedAttribute(book.id)} ></label>
            <button class="remove-btn">Remove</button>
            </div>`;
    //cardContainer.append(bookCard);
    })
}


function bindCheckboxListeners(){
    document.querySelectorAll('.readUnreadAttribute').forEach(checkbox =>{
    checkbox.addEventListener('change', (e)=> {
        
                const bookId = e.target.dataset.id;
                const book = myLibrary.find(book => book.id === bookId)
                if(book) book.toggleReadState(bookId); 
                cardContainer.innerHTML = '';
                //book.toggleReadState(bookId);

                displayBook()
                bindCheckboxListeners()
            })
        } )
    }

displayBook()
bindCheckboxListeners()

