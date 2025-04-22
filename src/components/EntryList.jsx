import React from 'react';
import { useJournal } from '../context/JournalContext';
import { format, parseISO } from 'date-fns';
import { FaTrash, FaEdit, FaRegSadTear } from 'react-icons/fa';
import { WiDaySunny, WiCloudy, WiRain, WiSnow, WiThunderstorm, WiFog } from 'react-icons/wi';

import './EntryList.css'; // Import the CSS file

const weatherIcons = {
  Clear: <WiDaySunny className="weather-icon-yellow" />,
  Clouds: <WiCloudy className="weather-icon-gray" />,
  Rain: <WiRain className="weather-icon-blue" />,
  Snow: <WiSnow className="weather-icon-light-blue" />,
  Thunderstorm: <WiThunderstorm className="weather-icon-purple" />,
  Drizzle: <WiRain className="weather-icon-medium-blue" />,
  Mist: <WiFog className="weather-icon-light-gray" />,
  Fog: <WiFog className="weather-icon-light-gray" />
};

const moodColors = {
  excited: 'mood-excited-bg',
  happy: 'mood-happy-bg',
  neutral: 'mood-neutral-bg',
  sad: 'mood-sad-bg',
  angry: 'mood-angry-bg'
};

const moodIcons = {
  excited: '😄',
  happy: '😊',
  neutral: '😐',
  sad: '😔',
  angry: '😠'
};

const EntryList = () => {
  const { entries, deleteEntry, setCurrentEntry, filter, setFilter } = useJournal();

  const filteredEntries = filter === 'all'
    ? entries
    : entries.filter(entry => entry.mood === filter);

  const handleEdit = (entry) => {
    setCurrentEntry(entry);
  };

  return (
    <div className="entry-list-container">
      <div className="entry-list-header">
        <h2 className="entry-list-title">Your Journal Entries</h2>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="filter-select"
        >
          <option value="all">All Moods</option>
          <option value="excited">Excited</option>
          <option value="happy">Happy</option>
          <option value="neutral">Neutral</option>
          <option value="sad">Sad</option>
          <option value="angry">Angry</option>
        </select>
      </div>

      {filteredEntries.length === 0 ? (
        <div className="no-entries">
          <FaRegSadTear className="no-entries-icon" />
          <p className="no-entries-text">No entries found</p>
        </div>
      ) : (
        <div className="entries-wrapper">
          {[...filteredEntries]
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .map((entry) => (
              <div
                key={entry.date}
                className={`entry-item ${moodColors[entry.mood]} entry-item-transition`}
              >
                <div className="entry-item-content">
                  <div>
                    <h3 className="entry-date">
                      {format(parseISO(entry.date), 'MMMM do, yyyy')}
                    </h3>
                    <div className="mood-info">
                      <span className="mood-icon">{moodIcons[entry.mood]}</span>
                      <span className="mood-text capitalize">{entry.mood}</span>
                    </div>
                    {entry.weather && (
                      <div className="weather-info">
                        <span className="weather-icon">
                          {weatherIcons[entry.weather.condition] || <WiDaySunny className="weather-icon-yellow" />}
                        </span>
                        <span className="weather-text">
                          {entry.weather.temp}°C, {entry.weather.description}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="entry-actions">
                    <button
                      onClick={() => handleEdit(entry)}
                      className="edit-button"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => deleteEntry(entry.date)}
                      className="delete-button"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
                {entry.note && (
                  <div className="entry-note-wrapper">
                    <p className="entry-note">{entry.note}</p>
                  </div>
                )}
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default EntryList;