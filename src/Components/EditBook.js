import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
 import '../Style/edit Book.css';
import { useSnackbar } from 'notistack';
import Header from './Header';
import Footer from './Pages/Footer';

function EditBook() {
  const { id } = useParams(); // Get the book ID from the URL parameter
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const [book, setBook] = useState({
    title: '',
    author: '',
    publishYear: '',
  });

  useEffect(() => {
    // Fetch the book details using the book's ID from the URL parameter
    axios
      .get(`https://book-store-api-t109.onrender.com/books/${id}`)
      .then((response) => {
        setBook(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setBook({ ...book, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Make a PUT request to update the book details
    axios
      .put(`https://book-store-api-t109.onrender.com/books/${id}`, book)
      .then(() => {
        console.log('Book updated successfully');
        enqueueSnackbar('Book is edited successfully', { variant: 'success' });
        navigate('/book-list');
      })
      .catch((error) => {
        enqueueSnackbar('Something went wrong. Please fill the form correctly', { variant: 'error' });
        console.error(error);
      });
  };

  return (
    <>  <Header/>
   
    <div className="card-container">
    
      <div className="card">
        <h2>Edit Book</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={book.title}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Author</label>
            <input
              type="text"
              name="author"
              placeholder="Author"
              value={book.author}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Year</label>
            <input
              type="number"
              name="publishYear"
              placeholder="Publish Year"
              value={book.publishYear}
              onChange={handleInputChange}
            />
          </div>
          <button className='button2' type="submit">Update Book</button>
        </form>
      </div>
      {/* <footer className='footer1'>@copy right sanjay web 2023</footer> */}
    </div>
    
    <Footer/>
     </>
  );
}

export default EditBook;
