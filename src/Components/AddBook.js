import React, { useState } from 'react';
import axios from 'axios';

function AddBook() {
  const [newBook, setNewBook] = useState({
    title: '',
    author: '',
    publishYear: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewBook({ ...newBook, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Make a POST request to add a new book to your backend API
    axios.post('http://localhost:5555/books', newBook)
      .then((response) => {
        console.log('Book added:', response.data);
        // You can update the UI as needed, e.g., show a success message or reset the form
        setNewBook({
          title: '',
          author: '',
          publishYear: '',
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <span className="book-list-title">Add New book </span>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={newBook.title}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="author"
          placeholder="Author"
          value={newBook.author}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="publishYear"
          placeholder="Publish Year"
          value={newBook.publishYear}
          onChange={handleInputChange}
        />
        <button type="submit">Add Book</button>
      </form>
    </div>
  );
}

export default AddBook;
