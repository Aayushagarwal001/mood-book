
# Mood Book with Weather 🌤️📔

A personal mood tracking application that integrates with real-time weather data.


## Features ✨

- **Mood Tracking**: Log your daily mood with 5 different emotion options
- **Weather Integration**: Automatically fetches local weather data
- **Calendar View**: Visualize your mood history by month
- **Dark Mode**: Toggle between light and dark themes
- **Responsive Design**: Works on both mobile and desktop

## How to Use 🚀

1. **Log Your Mood**:
   - Select how you're feeling using the emoji buttons
   - Add optional notes about your day
   - Click "Save Entry" to store your journal entry

2. **View Your History**:
   - Switch to "View Entries" to see past logs
   - Use the calendar to navigate specific dates
   - Filter entries by mood type

3. **Weather Info**:
   - The app automatically detects your location
   - Displays current temperature and conditions
   - Weather data is saved with each entry

## Installation 💻

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/mood-journal.git
   ```
2. Install dependencies:
   ```bash
   cd mood-journal
   npm install
   ```
3. Get a free API key from [OpenWeatherMap](https://openweathermap.org/)
4. Create a `.env` file in the root directory:
   ```
   REACT_APP_WEATHER_API_KEY=your_api_key_here
   ```
5. Start the development server:
   ```bash
   npm start
   ```

## Technologies Used 🛠️

- **Frontend**: React.js
- **Styling**: CSS
- **Date Handling**: date-fns
- **Weather Data**: OpenWeatherMap API
- **Icons**: React Icons
- **State Management**: React Context API

## Folder Structure 📂

```
src/
├── components/       # React components
├── context/         # State management
├── hooks/           # Custom hooks
├── styles/          # CSS files
├── App.js           # Main application
└── index.js         # Entry point
```

## Contributing 🤝

Contributions are welcome! Please follow these steps:

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License 📄

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Made with ❤️ by Aayush Agarwal
