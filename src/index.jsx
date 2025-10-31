import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { initializeData } from './utils/localStorageUtils';

// Initialize data
initializeData();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);