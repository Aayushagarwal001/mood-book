// App.js
import React, { useState } from 'react';
import EntryForm from './components/EntryForm';
import EntryList from './components/EntryList';
import CalendarView from './components/CalendarView';
import './App.css';

function App() {
  const [view, setView] = useState('form');
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={`app-wrapper ${darkMode ? 'dark-mode' : ''}`}>
      <header className="app-header">
        <h1 className="app-title">Mood Book</h1>
        <nav className="navbar">
          <button onClick={() => setView('form')} className="nav-link">New Entry</button>
          <button onClick={() => setView('list')} className="nav-link">View Entries</button>
          <button onClick={() => setView('calendar')} className="nav-link">Calendar</button>
          <button onClick={() => setDarkMode(!darkMode)} className="nav-link">
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </nav>
      </header>

      <main className="main-content">
        {view === 'form' && <EntryForm />}
        {view === 'list' && <EntryList />}
        {view === 'calendar' && <CalendarView />}
      </main>
    </div>
  );
}

export default App;
