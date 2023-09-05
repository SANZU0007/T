import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../Style/Table.css';

function Table() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
   
    axios
      .get('http://localhost:5555/books')
      .then((response) => {
        setBooks(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5555/books/${id}`)
      .then(() => {
        // After deleting, filter out the deleted book from state
        setBooks(books.filter((book) => book._id !== id));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="book-list-container">
      <h2 className="book-list-title">Book List</h2>
      <table className="book-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Year</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book._id}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.publishYear}</td>
              <td>
                <Link to={`/edit-book/${book._id}`}>
                  <button className="edit-button">Edit</button>
                </Link>
                <button className="delete-button" onClick={() => handleDelete(book._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
