import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { JournalProvider } from './context/JournalContext';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <JournalProvider>
      <App />
    </JournalProvider>
  </React.StrictMode>
);