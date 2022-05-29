import React from 'react';
import ReactDOM from 'react-dom/client';
import './styling/index.css';
import FindFavouriteLanguage from './components/findFavouriteLanguage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <FindFavouriteLanguage />
  </React.StrictMode>
);

