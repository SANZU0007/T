import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import "../Style/Addbook.css"
import Header from './Header';
import Footer from './Pages/Footer';

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
    axios
      .post('https://book-store-api-t109.onrender.com/books', newBook)
      .then((response) => {
        console.log('Book added:', response.data);
        // You can update the UI as needed, e.g., show a success message or reset the form
        setNewBook({
          title: '',
          author: '',
          publishYear: '',
        });
        enqueueSnackbar('Book added successfully', { variant: 'success' });
        navigate('/');
      })
      .catch((error) => {
        console.error(error);
        enqueueSnackbar('Something is missing. Please fill in all the fields.', { variant: 'error' });
      });
  };

  return (
    <>

    <Header/>
    <div className="add-book-container">
   
      <form  className="add-container" onSubmit={handleSubmit}>
        <h1>Create New book</h1>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={newBook.title}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Author</label>
          <input
            type="text"
            name="author"
            placeholder="Author"
            value={newBook.author}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Publish Year</label>
          <input
            type="number"
            name="publishYear"
            placeholder="Publish Year"
            value={newBook.publishYear}
            onChange={handleInputChange}
          />
        </div>
        <button className='button2'type="submit">Add Book</button>
      </form>
    </div>
    <Footer/>
    </>
  );
}

export default AddBook;
