/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars


{
  'use stricts';

  const select = {
    books: {
      bookList: '.books-list',
      bookImageLink: 'data-id',
      bookImage: '.book__image',
      bookFilters: '.filters',
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
      const Book= {
        id: book.id,
        name: book.name,
        price: book.price,
        rating: book.rating,
        image: book.image,
      };
      const generatedHTML = templates.bookList(Book);
      const element = utils.createDOMFromHTML(generatedHTML);
      const bookList = document.querySelector(select.books.bookList);
      bookList.appendChild(element);
    }
  }
  

  function initAction(){
    
    const books = document.querySelectorAll(select.books.bookImage);
    const favoriteBooks = [];
    
    for(const book of books) {
      book.addEventListener('dblclick', function(event)
      {console.log('favoriteBooks', favoriteBooks);
        event.preventDefault();
        const image = event.target.offsetParent;
        const bookId = image.getAttribute('data-id');
        console.log('bookId', bookId);
        if (favoriteBooks.includes(bookId)) {
          book.classList.remove('favorite');
          const bookIndex = favoriteBooks.indexOf(bookId);
          favoriteBooks.splice(bookIndex, 1);
        } else {
          book.classList.add('favorite');
          favoriteBooks.push(bookId);
        }
        console.log('favoriteBooks');
      });
    }

    const bookFilter = document.querySelector(select.books.bookFilters);

    bookFilter.addEventListener('click', function(callback){
      const clickedElm = callback.target;
      if(clickedElm.tagName == 'INPUT' && clickedElm.type == 'checkbox' && clickedElm.name == 'filters'){
        if(clickedElm.checked){
          bookFilter.push(clickedElm.value);
        } else {
          const indexValue = bookFilter.indexOf(clickedElm.value);
          bookFilter.splice(indexValue, 1);
        }
      }
      console.log('clickedElm:', clickedElm.value);
      filterBooks();
    });
  }
  function filterBooks(){
    for(let book of dataSource.books){
      const filteredBook = document.querySelector('.book__image[data-id="' + book.id + '"]');
      let shouldBeHidden = false;
      for(let filter of select.books.bookFilters){
        if(!book.details[filter]){
          shouldBeHidden = true;
          break;
        }
      }
      if(shouldBeHidden === true){
        filteredBook.classList.add('hidden');
        
      }else{
        filteredBook.classList.remove('hidden');
      }
      console.log('filteredBook', filteredBook);
    }
  }

  render();
  initAction();
 
}