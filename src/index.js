import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

/* Importing the ant design css file. */
import 'antd/dist/antd.css'

/* Creating a root element for the ReactDOM to render the App component to. */
const root = ReactDOM.createRoot(document.getElementById('root'));

/* Rendering the App component to the root element. */
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);