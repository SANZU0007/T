import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate} from 'react-router-dom';
import "../Style/edit Book.css"
import { useSnackbar } from "notistack";

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
    axios.get(`https://books-store-app-chvk.onrender.com/${id}`)
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
    axios.put(`https://books-store-app-chvk.onrender.com/${id}`, book)
      .then(() => {
        console.log('Book updated successfully');
        enqueueSnackbar("Books is edit", { variant: "success" }); 
        navigate('/book-list'); 
      })
      .catch((error) => {
        enqueueSnackbar("something is wrong full fill the form", { variant: "error" }); 
        console.error(error);

      });
  };

  return (
    <div>
       <span className="book-list-title">Book  Cart</span>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={book.title}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="author"
          placeholder="Author"
          value={book.author}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="publishYear"
          placeholder="Publish Year"
          value={book.publishYear}
          onChange={handleInputChange}
        />
        <button type="submit">Update Book</button>
      </form>
    </div>
  );
}

export default EditBook;
