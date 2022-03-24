/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars

{
  'use stricts';

  const select = {
    books: {
      bookList: '.books-list',
      bookImageLink: '#data-id',
      bookImage: '.book__image',
    },
    templateOf: {
      bookTemplate: '#template-book',
    }
  };

  const templates = {
    bookList: Handlebars.compile(document.querySelector(select.templateOf.bookTemplate).innerHTML),
  };

  function render(){
    for (let book of dataSource.books) {
      const generatedHTML = templates.bookList(book);
      const element = utils.createDOMFromHTML(generatedHTML);
      const bookList = document.querySelector(select.books.bookList);
      bookList.appendChild(element);
    }
  }
  render();

  function initAction(){
    const books = document.querySelectorAll(select.books.bookImage);
    const favoriteBooks = [];
    
    for(const book of books) {
      book.addEventListener('dblclick', function(event){
        event.preventDefault();
        const bookId = book.getAttribute(select.books.bookImageLink);
        if (favoriteBooks.includes(bookId)) {
          book.classList.remove('favorite');
        } else {
          book.classList.add('favorite');
          favoriteBooks.push(bookId);
        }
      });
    }
    
    console.log('favoriteBooks');
  }
  initAction();
 
}