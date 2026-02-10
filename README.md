# 🕌 Islamic Prayer Times & Daily Hadith

A modern, responsive web application that displays Islamic prayer times for any location, along with daily hadith quotes in English, Arabic, and Bosnian.

**Live Demo:** https://armin--nukic.github.io/Islamic-prayer-timetable/

---

## ✨ Features

✅ **Real-time Prayer Times** - Accurate prayer times based on user's location  
✅ **Daily Hadith Quotes** - 30+ Islamic hadith quotes in 3 languages  
✅ **Multi-Language Support** - English, Arabic (العربية), Bosnian (Bosanski)  
✅ **Geolocation** - Auto-detect user location or search by city  
✅ **Islamic Calendar** - Display current Hijri date  
✅ **Next Prayer Countdown** - Highlights next prayer with time remaining  
✅ **Fully Responsive** - Works perfectly on mobile, tablet, and desktop  
✅ **Modern Design** - Beautiful gradient UI with smooth animations  
✅ **Offline Support** - Service Worker for offline functionality  
✅ **Progressive Web App** - Can be installed on your device

---

## 🚀 Live Deployment (GitHub Pages)

This app is **already deployed and live** on GitHub Pages!

Visit: **https://armin--nukic.github.io/Islamic-prayer-timetable/**

The site is automatically updated whenever changes are pushed to the `main` branch.

---

## 🛠 Technologies Used

- **Frontend:** HTML5, CSS3, Vanilla JavaScript (ES6+)
- **APIs:**
  - [Aladhan Prayer Times API](https://aladhan.com) - Free prayer times (no API key needed)
  - [OpenStreetMap Nominatim](https://nominatim.org) - Free geocoding service
- **Fonts:** Google Fonts (Cairo for Arabic, Poppins for English)
- **Icons:** Font Awesome 6.4
- **PWA:** Service Workers, Web App Manifest

---

## 📁 Project Structure

```
Islamic-prayer-timetable/
├── index.html           # Main HTML file
├── style.css            # Modern CSS styling
├── script.js            # Core JavaScript logic
├── config.js            # Configuration settings
├── hadith-data.js       # Database of 30+ hadith quotes
├── manifest.json        # PWA manifest for app installation
├── sw.js                # Service Worker for offline support
├── .nojekyll            # GitHub Pages configuration
├── README.md            # This file
└── LICENSE              # MIT License
```

---

## 🎯 How It Works

### Prayer Times

1. User opens the app or is automatically located via geolocation
2. App fetches prayer times from **Aladhan API** (method 4)
3. Prayer times are displayed in a beautiful grid layout
4. Next prayer is highlighted with a countdown timer
5. User can search for different cities

### Hadith Quotes

- 30 authentic Islamic hadith quotes in database
- Daily hadith automatically changes at midnight
- Users can navigate with Previous/Next/Random buttons
- Available in English, Arabic, and Bosnian

---

## 📖 How to Use

### On the Web

1. Visit https://armin--nukic.github.io/Islamic-prayer-timetable/
2. Allow location access (or enter your city manually)
3. View prayer times and daily hadith
4. Navigate through hadith with buttons

### Local Development

#### Clone the Repository

```bash
git clone https://github.com/armin--nukic/Islamic-prayer-timetable.git
cd Islamic-prayer-timetable
```

#### Run Locally

```bash
# Python 3
python -m http.server 8000

# Or Python 2
python -m SimpleHTTPServer 8000
```

Then open: **http://localhost:8000**

---

## 🔧 Configuration

Edit `config.js` to customize settings like:

- Default location
- Prayer calculation method
- Language preferences
- Color scheme

---

## 🌐 APIs Used (Both Free & No API Key Required)

### Aladhan Prayer Times API

- ✅ Free
- ✅ No API key needed
- ✅ CORS enabled
- ✅ Worldwide coverage

### OpenStreetMap Nominatim Geocoding

- ✅ Free
- ✅ No API key needed
- ✅ CORS enabled

---

## 📱 Responsive Design

- **Desktop (1200px+):** Full layout
- **Tablet (768px):** Optimized for touch
- **Mobile (480px):** Vertical layout

---

## ✅ Security & Privacy

- 🔒 No personal data is stored
- 🔒 All API calls are HTTPS
- 🔒 No analytics or tracking
- 🔒 Open source (MIT License)
- **README.md** - This documentation file

## How to Use

### 1. Installation

Simply open the `index.html` file in any modern web browser. No server or installation required!

```
File → Open → Select index.html
```

Or if you have a local server:

```bash
python -m http.server 8000
# or
npx http-server
```

### 2. Getting Prayer Times

**Option 1: Auto-detect Location**

- Click the "Use My Location" button
- Allow the browser to access your location
- App will automatically fetch and display prayer times

**Option 2: Search by City**

- Type a city name in the input field
- Click "Search" or press Enter
- App will fetch prayer times for that location

### 3. Viewing Hadith Quotes

- Daily hadith automatically displays when you open the app
- Use "Next" and "Previous" buttons to browse hadith
- Click "Random" to get a random hadith quote
- Use arrow keys (← →) for keyboard navigation

## Supported Locations

The app supports:

- All countries worldwide
- Major and minor cities
- Multiple names for the same location
- Examples: London, Cairo, Sarajevo, Istanbul, Jakarta, New York, etc.

## Prayer Times Methods

The app uses the Aladhan API with method 4 (University of Islamic Sciences, Karachi) as default.

### Prayer Calculations Include:

- **Fajr** (Dawn) - First prayer of the day
- **Sunrise** - Sun rises above horizon
- **Dhuhr** (Noon) - Midday prayer
- **Asr** (Afternoon) - Afternoon prayer
- **Maghrib** (Sunset) - Evening prayer
- **Isha** (Night) - Night prayer

## Language Support

### Languages Available:

1. **English** - Default interface language
2. **Arabic (العربية)** - Prayer names and hadith in Arabic
3. **Bosnian (Bosanski)** - For Bosnian Muslim communities

## Hadith Database

The app includes 30 authentic hadith quotes covering topics like:

- Family and relationships
- Knowledge and learning
- Kindness and charity
- Patience and perseverance
- Prophet Muhammad's teachings
- Quranic verses on morality

All hadith are translated into three languages for better understanding.

## Technical Details

### APIs Used:

1. **Aladhan Prayer Times API**
   - Endpoint: `https://api.aladhan.com/v1/timings`
   - Method: 4 (University of Islamic Sciences, Karachi)
   - Free, no API key required

2. **OpenStreetMap Nominatim**
   - For geocoding and reverse geocoding
   - Free service, no API key required

### Browser Requirements:

- Modern browser (Chrome, Firefox, Safari, Edge)
- JavaScript enabled
- Geolocation support (optional, for GPS feature)
- Internet connection required

### No External Dependencies:

The app is built with vanilla HTML, CSS, and JavaScript. No frameworks or build tools required!

## Features Breakdown

### Location Services

```javascript
- Auto-detect current location with GPS
- Search any city worldwide
- Reverse geocode coordinates to city names
```

### Prayer Time Display

```javascript
- Shows all 6 prayer times
- Highlights next prayer
- Countdown timer
- Arabic prayer names
```

### Hadith Management

```javascript
- Load hadith of the day automatically
- Browse through 30 hadith quotes
- Random hadith selector
- Multilingual content
```

### Responsive Design

```javascript
- Works on desktop, tablet, and mobile
- Touch-friendly buttons
- Optimized layout for all screen sizes
```

## Customization

### Add New Hadith

Edit `hadith-data.js` and add to the `hadithData` array:

```javascript
{
    id: 31,
    english: "Your hadith in English",
    arabic: "Your hadith in Arabic",
    bosnian: "Your hadith in Bosnian"
}
```

### Change Prayer Time Method

In `script.js`, modify the API endpoint:

```javascript
// Change method parameter (1-15 available)
const url = `https://api.aladhan.com/v1/timings?latitude=${latitude}&longitude=${longitude}&method=1`;
```

### Modify Colors

Edit `:root` variables in `style.css`:

```css
:root {
  --primary-color: #1a7c5e;
  --secondary-color: #2d9d7a;
  --accent-color: #c4a747;
  /* ... */
}
```

## Islamic Prayer Times Information

### Prayer Time Methods (Fajr & Isha Angle):

1. **Ummah Al-Qura University** - 18.5° for Fajr, 90 minutes after Maghrib for Isha
2. **Islamic Society of North America** - 15° for Fajr, 15° for Isha
3. **Muslim World League** - 18° for Fajr, 17° for Isha
4. **Umm al-Qura University** - 18.5° for Fajr, 90 minutes after Maghrib
5. **Egyptian General Authority of Survey** - 19.5° for Fajr, 19.5° for Isha
6. **Institut Geografi Departemen Geografi** - 20° for Fajr, 18° for Isha
7. **Union Organization of Islamic Centers** - 12° for Fajr, 12° for Isha
8. **Al Shia (Jafari)** - 16° for Fajr, 14° for Isha

## Keyboard Shortcuts

- **Left Arrow (←)** - Previous Hadith
- **Right Arrow (→)** - Next Hadith
- **Enter** - Search Location

## Browser Compatibility

| Browser | Version | Support    |
| ------- | ------- | ---------- |
| Chrome  | 50+     | ✅ Full    |
| Firefox | 45+     | ✅ Full    |
| Safari  | 10+     | ✅ Full    |
| Edge    | 15+     | ✅ Full    |
| IE 11   | 11.0    | ⚠️ Partial |

## Troubleshooting

### Prayer Times Not Loading

- Check your internet connection
- Ensure JavaScript is enabled
- Try refreshing the page
- Verify location input is correct

### Geolocation Not Working

- Check browser permissions
- Some browsers require HTTPS for geolocation
- Use manual location search instead

### Hadith Not Displaying

- JavaScript must be enabled
- Check browser console for errors
- Ensure all files are in the same directory

## Future Enhancements

Possible additions in future versions:

- [ ] Offline support with Service Workers
- [ ] Prayer notifications/reminders
- [ ] Additional languages
- [ ] Expanded hadith database
- [ ] Prayer time preferences
- [ ] Dark mode
- [ ] Islamic calendar widget
- [ ] Qibla direction indicator
- [ ] Audio Adhan (call to prayer)
- [ ] Upcoming mosque events

## Attribution

### APIs and Services Used:

- **Aladhan API** - Prayer times calculation
- **OpenStreetMap Nominatim** - Location services
- **Font Awesome** - Icons

### Hadith Sources:

- Sahih Bukhari
- Sahih Muslim
- Tirmidhi
- Abu Dawood
- Quran translations

## Legal Notice

This application is for informational purposes. Prayer times are calculated based on the selected method but may vary based on:

- Exact location
- Local conventions
- Madhab (school of thought)
- Seasonal variations

Always confirm prayer times with your local mosque or Islamic center.

## License

This project is free to use and modify for personal and non-commercial purposes.

## Credits

Created with ❤️ for the Muslim community worldwide.

May Allah accept from all of us.

---

**Version:** 1.0  
**Last Updated:** February 2026

For more information or contributions, please feel free to contact the developer.

## Support

If you encounter any issues or have suggestions:

1. Check the browser console for error messages
2. Verify all files are in the correct location
3. Ensure JavaScript is enabled
4. Try a different browser
5. Clear browser cache and refresh

## Good Practices

### For Best Results:

- ✅ Use HTTPS for geolocation to work properly
- ✅ Allow location permissions when prompted
- ✅ Keep browser updated
- ✅ Check prayer times with local mosque
- ✅ Share this app with your Muslim community

### Islamic Etiquette:

- Remember to recite Adhan (call to prayer)
- Perform wudu (ablution) before prayer
- Be respectful of prayer times
- Encourage others to pray on time

---

**Baarak Allahu feekum! (May Allah bless you!)**

اللَّهُ اكْبَرُ اللَّهُ اكْبَرُ
**Allahu Akbar! Allahu Akbar!**
