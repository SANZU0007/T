import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import AddBook from './Components/AddBook';
import EditBook from './Components/EditBook';
import Table from './Components/Table';
import BookCart from './Components/BookList';
import "../src/App.css"

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
          <li>
              <Link to="/">Home Site</Link>
            </li>
            <li>
              <Link to="/add-book">Add Book</Link>
            </li>
            <li>
              <Link to="/book-list">Book Cart</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/add-book" element={<AddBook />} />
          <Route path="/" element={<Table />} />
          <Route path="/edit-book/:id" element={<EditBook />} />
          <Route path="/book-list" element={<BookCart />} />
        </Routes>
        <footer className='footer1'>@copy right sanjay web 2023</footer>
      </div>
    </Router>
  );
}


export default App;
