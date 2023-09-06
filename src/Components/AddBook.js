import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from "notistack";




function AddBook() {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
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
    axios.post('https://books-store-app-chvk.onrender.com/books', newBook)
      .then((response) => {
        console.log('Book added:', response.data);
        // You can update the UI as needed, e.g., show a success message or reset the form
        setNewBook({
          title: '',
          author: '',
          publishYear: '',
        });
        enqueueSnackbar("Books is edit", { variant: "success" }); 
        navigate('/');
      })
      .catch((error) => {
        console.error(error);
        enqueueSnackbar("some thing missing pls add", { variant: "error" }); 
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
