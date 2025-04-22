// src/context/JournalContext.js
import { createContext, useContext, useState, useEffect } from 'react';

const JournalContext = createContext();

export const JournalProvider = ({ children }) => {
  const [entries, setEntries] = useState([]);
  const [currentEntry, setCurrentEntry] = useState({
    date: new Date().toISOString().split('T')[0],
    mood: null,
    note: '',
    weather: null
  });
  const [filter, setFilter] = useState('all'); // 1. Declare the filter state

  // Load saved entries from localStorage
  useEffect(() => {
    const savedEntries = JSON.parse(localStorage.getItem('moodJournalEntries')) || [];
    setEntries(savedEntries);
  }, []);

  // Save entries to localStorage
  useEffect(() => {
    localStorage.setItem('moodJournalEntries', JSON.stringify(entries));
  }, [entries]);

  const saveEntry = (newEntry) => {
    const updatedEntries = [...entries.filter(entry => entry.date !== newEntry.date), newEntry];
    setEntries(updatedEntries);
  };

  const deleteEntry = (dateToDelete) => {
    const updatedEntries = entries.filter(entry => entry.date !== dateToDelete);
    setEntries(updatedEntries);
  };

  return (
    <JournalContext.Provider value={{
      entries,
      currentEntry,
      setCurrentEntry,
      saveEntry,
      deleteEntry, // 3. Include deleteEntry
      filter: filter, // 2. Include filter
      setFilter: setFilter // 2. Include setFilter
    }}>
      {children}
    </JournalContext.Provider>
  );
};

export const useJournal = () => {
  const context = useContext(JournalContext);
  if (context === undefined) {
    throw new Error('useJournal must be used within a JournalProvider');
  }
  return context;
};