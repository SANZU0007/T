import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../Style/Booklist.css";
import { useSnackbar } from "notistack";


function BookCart() {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null); // To store the selected book for info display
  const [infoVisible, setInfoVisible] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    // Make a GET request to fetch the list of books from your backend API
    axios
      .get("https://books-store-app-chvk.onrender.com/books")
      .then((response) => {
        setBooks(response.data.data);
     
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`https://books-store-app-chvk.onrender.com/books/${id}`)
      .then(() => {
     
        setBooks(books.filter((book) => book._id !== id));
        enqueueSnackbar("Books is delete", { variant: "success" }); 
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const showInfo = (book) => {
    setSelectedBook(book);
    setInfoVisible(true);
  };

  return (
    <div className="book-list-container">
      <span className="book-list-title">Book Cart</span>
      <div className="book-card-container">
        {books.map((book) => (
          <div key={book._id} className="book-card">
            <div className="book-image">
              {/* You can add an image here if you have book cover images */}
            </div>
            <div className="book-details">
              <div className="book-title">Title: {book.title}</div>
              <div className="book-author">Author: {book.author}</div>
              <div className="book-year">Year: {book.publishYear}</div>
            </div>
            <div className="book-actions">
              <Link to={`/edit-book/${book._id}`}>
                <button className="edit-button">Edit</button>
              </Link>
              <button
                className="delete-button"
                onClick={() => handleDelete(book._id)}
              >
                Delete
              </button>
              <button className="info" onClick={() => showInfo(book)}>Info</button>
            </div>
          </div>
        ))}
      </div>
      {infoVisible && selectedBook && (
        <div className="book-info">
          <h2>Book Info Cart</h2>
          <p>Title: {selectedBook.title}</p>
          <p>Author: {selectedBook.author}</p>
          <p>Year: {selectedBook.publishYear}</p>
          <p>Description: {selectedBook.description}</p>
          <p>
            A book is a medium for recording information in the form of writing
            or images, typically composed of many pages bound together and
            protected by a cover. It can also be a handwritten or printed work
            of fiction or nonfiction, usually on sheets of paper fastened or
            bound together within covers
          </p>
          <button  className="info"onClick={() => setInfoVisible(false)}>Close</button>
        </div>
      )}
    </div>
  );
}

export default BookCart;
