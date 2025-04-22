import { useJournal } from '../context/JournalContext';
import { 
  format, 
  startOfMonth, 
  endOfMonth, 
  eachDayOfInterval,  
  isSameDay, 
  parseISO,
  addMonths,
  subMonths,
  getDay,
} from 'date-fns';
import { useState } from 'react';
import { FaChevronLeft, FaChevronRight, FaRegCalendarAlt } from 'react-icons/fa';
import './CalendarView.css';

const moodColors = {
  excited: '#FFD700',
  happy: '#A2D729',
  neutral: '#87CEEB',
  sad: '#9B59B6',
  angry: '#E74C3C'
};

const CalendarView = () => {
  const { entries } = useJournal();
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Get the starting day of the month (0 = Sunday, 6 = Saturday)
  const startDay = getDay(monthStart);
  
  // Create empty cells for days before the 1st of the month
  const blankDays = Array(startDay).fill(null);

  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

  const getEntryForDate = (date) => {
    return entries.find(entry => isSameDay(parseISO(entry.date), date));
  };

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <h2 className="calendar-title">
          <FaRegCalendarAlt className="calendar-icon" /> Calendar View
        </h2>
        <div className="month-navigation">
          <button onClick={prevMonth} className="nav-button">
            <FaChevronLeft />
          </button>
          <span className="month-display">
            {format(currentMonth, 'MMMM yyyy')}
          </span>
          <button onClick={nextMonth} className="nav-button">
            <FaChevronRight />
          </button>
        </div>
      </div>

      <div className="calendar-grid">
        {/* Day names header */}
        {dayNames.map((day) => (
          <div key={day} className="day-header">
            {day}
          </div>
        ))}

        {/* Blank days before the 1st of the month */}
        {blankDays.map((_, index) => (
          <div key={`blank-${index}`} className="calendar-day blank-day"></div>
        ))}

        {/* Calendar days */}
        {monthDays.map((day) => {
          const entry = getEntryForDate(day);
          const isToday = isSameDay(day, new Date());
          
          return (
            <div
              key={day.toString()}
              className={`calendar-day ${isToday ? 'today' : ''}`}
            >
              <div className="day-number">
                {format(day, 'd')}
              </div>
              {entry && (
                <div 
                  className="mood-indicator"
                  style={{ backgroundColor: moodColors[entry.mood] || '#CCCCCC' }}
                  title={`${entry.mood}${entry.weather?.temp ? `, ${entry.weather.temp}°C` : ''}`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarView;