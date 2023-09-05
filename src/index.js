import React from 'react';
import ReactDOM from 'react-dom'; // Correct import
import './index.css';
import App from './App';
import { SnackbarProvider } from 'notistack'; // Import SnackbarProvider

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <SnackbarProvider maxSnack={3}> {/* You can set the max number of displayed snackbars */}
      <App />
    </SnackbarProvider>
  </React.StrictMode>
);
