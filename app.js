const cardContainer = document.querySelector('.card-container');//Selects the card container in the html.
const bookCard = document.querySelector('.book-card');//Selects bookcard class in the html

/** 
**-When we create a book or a 
**book object remember we will
**need to store the books somewhere
**thats why we create an array 
**to store the books and keep them tracked
*/
const myLibrary = []; 


/**
 ** BOOK CONSTRUCTOR
*-The book constructor initiates an instance
or object. A constructor is like a blueprint 
which has details as to how the object is built
basically how everything is put together.
Think of it like a instruction for baking a cake
but each cake (book) can have different ingredients (data).
 */
function Book( title, author, pages, read){
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

//Creating book prototype to handle read status
/**
 **OBJECT PROTOTYPE
*-This below is an object prototype
to which all object inherit  properties 
from. Its like the father of an object that is created.
A parent where an object of that construct inherits properties such as(FUNCTIONS)
 */

/**
 ** The prototype below  has a function that
that checks the read state of a book.
It checks if the book read checkbox is checked using an ternary operator ? ....: (else)...
Since every object instance inherits from the prototype
then the prototypes keeps the checkbox check state of the book whether its changed or unchanged 
This function will return "Checked" if the book is checked.
 */
Book.prototype.getCheckedAttribute= function (){
    return this.read ? 'checked' : '';
}

/** 
 *The prototype function below is used to get 
label of the book if its read or unread.
*/
Book.prototype.getLabel= function (){
    return this.read ? 'Read' : 'Unread';
}

/**
 **The TOGGLEREADSTATE prototype function checks 
 receives the new id paramete and if the id in the 
 book object matches the pass id then it use a switch 
 state to change if the book is read or unread and returns 
 a label. It actually switches the read status from true to false and viceversa

 */


 // The toggleReadState prototype method receives an ID.
// If it matches this book’s ID, it flips the read state (true ↔ false).
// This allows us to track changes to the book's read status via the checkbox.
Book.prototype.toggleReadState = function (newId){
    if(this.id === newId) {
        this.read = !this.read
        console.log(this.read)
    } ;
}


/**
 **The addBookToLibrary function creates 
a new book instance and pushes the book object into the MyLibrary array.
 */
function addBookToLibrary(title, author, pages, read){
    const newBook = new Book( title, author,  pages, read)
    console.log(newBook.title, newBook.id);
    myLibrary.push(newBook)
}

addBookToLibrary( 'The wall', 'Arthur Spwein', 300, true)
addBookToLibrary( 'The wall secrets', 'Arthur Spwein', 360, false)
addBookToLibrary( 'Kingslaive : The Reckoning', 'Arthur Spwein', 360, false)

/**
 **The generateBookHTML generates the html for the book.
  **Remember : data-id=book.id "Use [e.target.dataset.id] to extract the data.id"
 */
function generateBookHTML(book){
    return`
        <div class="book-card">
        <h3 class="book-title">Title: ${book.title}</h3>
        <p class="book-author">Author: ${book.author}</p>
        <p class="book-pages">Page: ${book.pages}</p>
        <label for="read">${book.getLabel()} <input type="checkbox" class="readUnreadAttribute" data-id='${book.id}' ${book.getCheckedAttribute(book.id)} ></label>
        <button class="remove-btn">Remove</button>
        </div>`;
}

/**
 **We separated the presentation and the logic.
 **The foreach function iterates through the myLibrary array and for each book it adds the book to the innerHTMl.
 **generateBookHTML(book) receives @param book , which is a book object and builds the UI and returns it , Finally appends the return to the html page.
 */
function displayBook(){
    myLibrary.forEach(book => {
        cardContainer.innerHTML += generateBookHTML(book);
    })
}

//The function below binds the checkbox listeners
/**
 **HERE IS WHATS HAPPENING BELOW
**The queryselector all is returning a array or nodelist and we use the foreach function to iterate through that list.
**Then for each checkbox its adding an event listener whci uses the "Change" method=====(This method is used to used to listen to when a element changes its state and used in imput boxes , checkboxes and everything that uses state.)
**When a change happens bookId = e.target.dataset.id stores the id of the book in bookId. It gets it from the target element which is paired has the id bound to the input element.
**We use the find {myLibrary.find(book => book.id === bookId)} to find the the book.id which is equal to bookId.
 */
function bindCheckboxListeners(){
    document.querySelectorAll('.readUnreadAttribute').forEach(checkbox =>{
    checkbox.addEventListener('change', (e)=> {
        
                const bookId = e.target.dataset.id;
                const book = myLibrary.find(book => book.id === bookId)
                if(book) book.toggleReadState(bookId); //If the above condition is true then we pass the bookId yo toggleReadState.
                cardContainer.innerHTML = ''; //This will reset the and empty the cardContainer
                //book.toggleReadState(bookId);

                displayBook() //Will call displayBook to display the books which in the process will invoke other functions that are reliant on it such as prototype functions.
                bindCheckboxListeners() //Since we clear the DOM using innerHTML="", then we need to rebind the  listeners. This will all be done when the bindCheckboxListeners function is invoked
            })
        } )
    }

displayBook() //This invokes the first time displayBook when the DOM renders for the first time.
bindCheckboxListeners()// Binds the listeners to toggle elements when the DOM renders for the first time.

