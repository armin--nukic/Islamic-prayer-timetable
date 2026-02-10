// Configuration file for Islamic Prayer Times App

const APP_CONFIG = {
  // App Information
  APP_NAME: "Islamic Prayer Times & Daily Hadith",
  APP_VERSION: "1.0",
  APP_AUTHOR: "Islamic App Developer",

  // Default Location (fallback)
  DEFAULT_LOCATION: {
    name: "Sarajevo",
    latitude: 43.9159,
    longitude: 18.4131,
    country: "Bosnia and Herzegovina",
  },

  // Prayer Time Calculation Method
  // 1: Ummah Al-Qura University
  // 2: Islamic Society of North America
  // 3: Muslim World League
  // 4: Umm al-Qura University (Default)
  // 5: Egyptian General Authority of Survey
  // 6: Institut Geografi Departemen Geografi
  // 7: Union Organization of Islamic Centers
  // 8: Al Shia (Jafari)
  PRAYER_METHOD: 4,

  // School of Thought
  // 0: Shafi (default)
  // 1: Hanafi
  FIQH_METHOD: 0,

  // Adjustment Minutes
  // Positive number adds minutes, negative subtracts
  ADJUSTMENT_MINUTES: {
    fajr: 0,
    sunrise: 0,
    dhuhr: 0,
    asr: 0,
    maghrib: 0,
    isha: 0,
  },

  // Hadith Settings
  HADITH_AUTO_UPDATE: true,
  HADITH_UPDATE_TIME: "00:00", // Update at midnight

  // Display Settings
  TIME_FORMAT: "24h", // '24h' or '12h'
  DATE_LANGUAGE: "en", // 'en', 'ar', 'bs'
  PRAYER_SOUND_ENABLED: false,

  // API Settings
  NOMINATIM_TIMEOUT: 5000, // milliseconds
  ALADHAN_TIMEOUT: 5000,

  // Color Scheme
  COLORS: {
    primary: "#1a7c5e",
    secondary: "#2d9d7a",
    accent: "#c4a747",
    dark: "#0f3a2f",
    light: "#f5f5f5",
  },

  // Feature Toggles
  FEATURES: {
    geolocation: true,
    locationSearch: true,
    hadith: true,
    islamicCalendar: true,
    notifications: false,
    serviceWorker: true,
    darkMode: false,
  },

  // Islamic Information
  ISLAMIC_INFO: {
    language: "en", // Default language
    translations: ["en", "ar", "bs"], // Available translations
    arabicFont: "Arial, sans-serif",
  },

  // Notification Settings (if enabled)
  NOTIFICATIONS: {
    enabled: false,
    advanceMinutes: 10, // Notify 10 minutes before prayer
    sound: true,
    vibration: true,
  },

  // Cache Settings
  CACHE: {
    enabled: true,
    ttl: 3600000, // 1 hour in milliseconds
  },

  // External APIs
  APIS: {
    prayerTimes: "https://api.aladhan.com/v1/timings",
    geocoding: "https://nominatim.openstreetmap.org/search",
    reverseGeocoding: "https://nominatim.openstreetmap.org/reverse",
  },

  // Keyboard Shortcuts
  SHORTCUTS: {
    nextHadith: "ArrowRight",
    prevHadith: "ArrowLeft",
    randomHadith: "r",
    search: "/",
    settings: "s",
  },

  // Supported Languages
  LANGUAGES: {
    en: { name: "English", nativeName: "English", dir: "ltr" },
    ar: { name: "Arabic", nativeName: "العربية", dir: "rtl" },
    bs: { name: "Bosnian", nativeName: "Bosanski", dir: "ltr" },
  },

  // Prayer Names in Different Languages
  PRAYER_NAMES: {
    fajr: { en: "Fajr", ar: "الفجر", bs: "Sabah" },
    sunrise: { en: "Sunrise", ar: "الشروق", bs: "Izlazak sunca" },
    dhuhr: { en: "Dhuhr", ar: "الظهر", bs: "Podne" },
    asr: { en: "Asr", ar: "العصر", bs: "Srednja" },
    maghrib: { en: "Maghrib", ar: "المغرب", bs: "Zalazak sunca" },
    isha: { en: "Isha", ar: "العشاء", bs: "Noćna" },
  },

  // Islamic Months
  ISLAMIC_MONTHS: {
    1: { en: "Muharram", ar: "محرم" },
    2: { en: "Safar", ar: "صفر" },
    3: { en: "Rabi' al-Awwal", ar: "ربيع الأول" },
    4: { en: "Rabi' al-Thani", ar: "ربيع الثاني" },
    5: { en: "Jumada al-Awwal", ar: "جمادى الأولى" },
    6: { en: "Jumada al-Thani", ar: "جمادى الثانية" },
    7: { en: "Rajab", ar: "رجب" },
    8: { en: "Sha'ban", ar: "شعبان" },
    9: { en: "Ramadan", ar: "رمضان" },
    10: { en: "Shawwal", ar: "شوال" },
    11: { en: "Dhu al-Qi'dah", ar: "ذو القعدة" },
    12: { en: "Dhu al-Hijjah", ar: "ذو الحجة" },
  },
};

// Export for use in other scripts
if (typeof module !== "undefined" && module.exports) {
  module.exports = APP_CONFIG;
}
