import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../Style/Table.css';
import { useSnackbar } from 'notistack';
import Header from './Header';
import Footer from './Pages/Footer';

function Table() {
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10); // Updated to 10
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false); 
  useEffect(() => {
    setIsLoading(true)
    axios
      .get('https://book-store-api-t109.onrender.com/books')
      .then((response) => {
        setBooks(response.data.data);
        setIsLoading(false)
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false)
      });
  }, []);

  const handleDelete = (id) => {
    setIsLoading(true)
    axios
      .delete(`https://book-store-api-t109.onrender.com/books/${id}`)
      .then(() => {
        // After deleting, filter out the deleted book from state
        setBooks(books.filter((book) => book._id !== id));        setIsLoading(false)
        enqueueSnackbar('Book is deleted successfully', { variant: 'success' });

      })
      .catch((error) => {
        console.error(error);   setIsLoading(false)
        enqueueSnackbar('Something went wrong', { variant: 'error' });
      });
  };

  // Calculate the index of the last item to be displayed on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  // Calculate the index of the first item to be displayed on the current page
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // Get the current items to display on the page
  const currentBooks = books.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
    <Header/>
    
    
    {isLoading && (
      <div style={{
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        background: 'rgba(255, 255, 255, 0.8)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: '1000',
        padding: '20px',
        borderRadius: '8px',
        textAlign: 'center',
      }}>
        {/* <CircularProgress color="secondary" /> */}
        <p className="loadinganimation" style={{ marginTop: '10px' }}>Please wait</p>
      </div>
    )}

   
    <div className='bgcolor' >

    <div className="book-list-container">
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
          {currentBooks.map((book) => (
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

      {/* Pagination */}
      <div className="pagination">
        {Array.from({ length: Math.ceil(books.length / itemsPerPage) }, (_, i) => (
          <button key={i + 1} onClick={() => paginate(i + 1)}>
            {i + 1}
          </button>
        ))}
      </div>
    </div></div>
    
    <Footer/>
    </>
 
  );
}

export default Table;
