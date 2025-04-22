import React, { useState, useEffect } from 'react';
import { useJournal } from '../context/JournalContext';
import { format } from 'date-fns';
import WeatherDisplay from './WeatherDisplay';
import './EntryForm.css';

const moods = [
  { id: 'happy', emoji: '😊', color: '#c2bc8d' },
  { id: 'excited', emoji: '🤩', color: '#E1BEE7' },
  { id: 'calm', emoji: '😌', color: '#B2EBF2' },
  { id: 'sad', emoji: '😔', color: '#BBDEFB' },
  { id: 'angry', emoji: '😠', color: '#FFCDD2' }
];

const EntryForm = () => {
  const { currentEntry, setCurrentEntry, saveEntry } = useJournal();
  const [note, setNote] = useState('');
  const [bgColor, setBgColor] = useState('#fff');
  const [coords, setCoords] = useState(null);
  const [locationError, setLocationError] = useState(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocationError('Geolocation not supported.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoords({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
      },
      (error) => {
        setLocationError('Unable to retrieve location.');
      }
    );
  }, []);

  useEffect(() => {
    setNote(currentEntry.note || '');
    const mood = moods.find((m) => m.id === currentEntry.mood);
    if (mood) setBgColor(mood.color);
  }, [currentEntry]);

  const handleMoodSelect = (mood) => {
    setCurrentEntry({ ...currentEntry, mood: mood.id });
    setBgColor(mood.color);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!currentEntry.mood) {
      alert('Please select a mood first!');
      return;
    }

    saveEntry({
      ...currentEntry,
      note,
      date: format(new Date(), 'yyyy-MM-dd'),
      weather: coords ? {} : null
    });

    alert('Journal entry saved!');
    setCurrentEntry({ mood: null, note: '' });
    setNote('');
    setBgColor('#fff');
  };

  return (
    <div className="entry-form" style={{ backgroundColor: bgColor }}>
      <h1 className="form-title">Today's Journal</h1>
      <div className="current-date">{format(new Date(), 'EEEE, MMMM dd, yyyy')}</div>

      {locationError && <div className="location-error">{locationError}</div>}

      <WeatherDisplay coords={coords} />

      <div className="mood-section">
        <h2>How are you feeling today?</h2>
        <div className="mood-grid">
          {moods.map((mood) => (
            <button
              key={mood.id}
              className={`mood-card ${currentEntry.mood === mood.id ? 'selected' : ''}`}
              onClick={() => handleMoodSelect(mood)}
            >
              <div className="emoji">{mood.emoji}</div>
              <div className="mood-text">{mood.id.charAt(0).toUpperCase() + mood.id.slice(1)}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="notes-section">
        <h2>Journal Notes</h2>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Write about your day..."
        />
      </div>

      <button className="save-button" onClick={handleSubmit}>
        Save Entry
      </button>
    </div>
  );
};

export default EntryForm;
