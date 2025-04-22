import { useJournal } from '../context/JournalContext';
import { FaLaugh, FaSmile, FaMeh, FaFrown, FaSadTear } from 'react-icons/fa';
import './MoodSelector.css';

const moods = [
  { id: 'excited', label: 'Excited', icon: <FaLaugh />, bg: 'mood-excited' },
  { id: 'happy', label: 'Happy', icon: <FaSmile />, bg: 'mood-happy' },
  { id: 'neutral', label: 'Calm', icon: <FaMeh />, bg: 'mood-neutral' },
  { id: 'sad', label: 'Sad', icon: <FaFrown />, bg: 'mood-sad' },
  { id: 'angry', label: 'Angry', icon: <FaSadTear />, bg: 'mood-angry' }
];

const MoodSelector = () => {
  const { currentEntry, setCurrentEntry } = useJournal();

  const handleMoodSelect = (mood) => {
    setCurrentEntry({ ...currentEntry, mood });
  };

  return (
    <div className="mood-selector-container">
      <h2 className="mood-title">How are you feeling today?</h2>
      <div className="mood-options">
        {moods.map((m) => (
          <button
            key={m.id}
            className={`mood-card ${m.bg} ${currentEntry.mood === m.id ? 'selected' : ''}`}
            onClick={() => handleMoodSelect(m.id)}
          >
            <div className="emoji">{m.icon}</div>
            <div className="label">{m.label}</div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MoodSelector;
