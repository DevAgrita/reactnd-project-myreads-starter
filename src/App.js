import React, {Component} from 'react'
import * as BooksAPI from './BooksAPI'
import { Route, Link } from 'react-router-dom'
import './App.css'

class BooksApp extends Component {
  state = {
    books : []
  };

  componentDidMount = () => {
    BooksAPI.getAll().then(books =>{
      this.setState({ books: books});
    });
  }; // get all books from backend API.

  sections = [
    { key: 'currentlyReading', name : 'Currently Reading'},
    { key: 'wantToRead', name: 'Want To Read'},
    { key: 'read', name: 'Book Finished'},
   ];

  render() {
    const { books } = this.state;
    const { sections } = this.sections;
    return (
      <div className="app">
        <Route exact path="/"        
        render={ () => (
          <BookList sections={this.sections} books={books}/>
        )} 
        />
        {<Route exact path="/search" render={()=> <SearchBooks books={books}/>} /> }
      </div>
    );
  }
}

class BookList extends Component {
  render() {
    const {sections, books} = this.props;
    return (
      <div className= "Book-list">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <Bookcase bookshelves = {sections} books={books} />
        <SearchButton />
        </div>
    );
  }
}


// defined three important components above, search component, book list and the app component which wraps both of them.

// function being defined now.

const SearchButton = () => {
  return(
    <div className = "open-search">
      <Link to = "search">
        <button>Add a button</button>
      </Link>
    </div>
  );
};

const Bookcase = props => {
  const {bookshelves, books} = props;
  return(
    <div className="list-books-content">
      <div className= "book-shelf">
        {bookshelves.map( shelf => (
          <BookShelf key= {shelf.key} shelf= {shelf} books={books}
          />
        ))}        
      </div>
    </div>
  );
}

const BookShelf = props => {
  const {shelf, books} = props;
  const booksOnThisShelf = books.filter(book => book.shelf === shelf.key);
  console.log(books);
  return(
    <div className = "bookshelf">
      <h2 className="bookshelf-title">{shelf.name}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {booksOnThisShelf.map(book => (
          <Book key= {book.id} book={book} shelf={shelf.key}/>))}
          {console.log(booksOnThisShelf)}
        </ol>
      </div>
    </div>
  );
};

const Book = props => {
  const {book, shelf} = props;
  return(
    <li>
      <div className="book">
        <div className = "book-top">
          <div
          className="book-cover"
          style={{
            width: 128,
            height:193,
            backgroundImage:
              `url(${book.imageLinks.thumbnail})`,
          }}
          />
          <BookShelfChanger book={book} shelf={shelf}/>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{book.authors.join(', ')}</div>
      </div>
    </li>
  );
};

class BookShelfChanger extends Component {
  render(){
    return(
    <div className="book-shelf-changer">
      <select value={this.props.shelf}>
        <option value="move" disabled>
          Move to..
        </option>
        <option value="currently reading">Currently Reading </option>
        <option value="wantToRead">Want To Read</option>
        <option value="read">Read </option>
        <option value="none">None</option>
      </select>
    </div>
    );
  }
}

const SearchResults = props => {
  const {books} = props;
  return(
    <div className="search-books-results">
      <ol className="books-grid">
        {books.map(book => (
          <Book key={book.id} book={book} shelf="none"/>
        ))}
      </ol>
    </div>
  )
} 

class SearchBooks extends Component {
  render() {
    const {books} = this.props;
    return(
      <div className="search-books">
      </div>
    )
  }
} 



export default BooksApp;