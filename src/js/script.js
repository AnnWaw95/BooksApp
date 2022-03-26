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

  class BooksList {

    constructor(){
      const thisBookList = this;
      thisBookList.initData();
      thisBookList.getElements();
      thisBookList.render();
      thisBookList.initAction();
    }

    initData() {
      
      this.data = dataSource.books;
      
    }

    getElements(){
      const thisBookList = this;
      thisBookList.bookListContainer = document.querySelector(select.books.bookList);
    }

    render(){
      const thisBooksList = this;
      for (let oneBook of dataSource.books) {
        
        const book= {
          id: oneBook.id,
          name: oneBook.name,
          price: oneBook.price,
          rating: oneBook.rating,
          image: oneBook.image,
        };
        const ratingBgc = thisBooksList.determineRatingBgc(book.rating);
        book.ratingBgc = ratingBgc;
        const ratingWidth = book.rating * 10;
        book.ratingWidth = ratingWidth;
        console.log(ratingWidth);
        
        const generatedHTML = templates.bookList(book);
        const element = utils.createDOMFromHTML(generatedHTML);
        const bookList = document.querySelector(select.books.bookList);
        bookList.appendChild(element);
      }
    }
  

    initAction(){
      const thisBooksList = this;
      const books = document.querySelectorAll(select.books.bookImage);
      const favoriteBooks = [];
    
      for(const book of books) {
        book.addEventListener('dblclick', function(event)
        {console.log('favoriteBooks', favoriteBooks);
          event.preventDefault();
          const image = event.target.offsetParent;
          const bookId = image.getAttribute('data-id');
          console.log('bookId', bookId);
          if (thisBooksList.favoriteBooks.includes(bookId)) {
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
        thisBooksList.filterBooks();
      });
    }
    filterBooks(){
      const thisBooksList = this;
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

    determineRatingBgc(rating){
      let background = '';
      if(rating < 6){
        background = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
      }else if(rating > 6 && rating <= 8){
        background = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
      }else if(rating > 8 && rating <= 9){
        background = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
      }else if(rating > 9){
        background = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
      }
      return background;
    }
  }

  const app = new BooksList();
 
}