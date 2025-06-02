import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { initializeData } from './utils/localStorageUtils';
import './styles/main.css';

// Initialize data
initializeData();

// Apply saved theme
const savedTheme = localStorage.getItem('theme') || 'light';
document.body.setAttribute('data-theme', savedTheme);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);