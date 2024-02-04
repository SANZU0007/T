import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import AddBook from './Components/AddBook';
import EditBook from './Components/EditBook';
import Table from './Components/Table';
import BookCart from './Components/BookList';
import "../src/App.css"
import Header from './Components/Header';
import Login from "./Components/Pages/Login"
import Register from './Components/Pages/Register';
import Forget from './Components/Pages/ForgetPasswors';
import Reset from './Components/Pages/Reset';
import ChangePasswordForm from './Components/Pages/ChangePassword';

function App() {
  return (
    <Router>

       {/* <Header/> */}
        <Routes>
        <Route path="/forgetpassword" element={<Forget/>} />
        <Route path="/" element={<Login/>} />
        <Route path="/changepass" element={<ChangePasswordForm/>} />
        <Route path="/save-new-password" element={<Reset/>} />
        <Route path="/signup" element={<Register/>} />
          <Route path="/add-book" element={<AddBook />} />
          <Route path="/table" element={<Table />} />
          <Route path="/edit-book/:id" element={<EditBook />} />
          <Route path="/book-list" element={<BookCart />} />
        </Routes>
        {/* */}
  
    </Router>
  );
}


export default App;
