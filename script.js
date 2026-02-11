// ==========================================
// ISLAMIC PRAYER TIMES & HADITH APP
// ==========================================

// Global variables
let currentLocation = null;
let currentPrayerTimes = null;
let currentIslamicDate = null;
let currentHadithIndex = 0;
let currentCoordinates = null;

// ==========================================
// INITIALIZATION
// ==========================================

document.addEventListener("DOMContentLoaded", function () {
  console.log("=== APP STARTING ===");
  initializeApp();
  // Dark mode toggle
  const darkBtn = document.getElementById("toggleDarkMode");
  if (darkBtn) {
    // Set initial mode from localStorage
    if (localStorage.getItem("darkMode") === "true") {
      document.body.classList.add("dark-mode");
      darkBtn.textContent = "☀️ Light Mode";
    }
    darkBtn.addEventListener("click", function () {
      document.body.classList.toggle("dark-mode");
      const isDark = document.body.classList.contains("dark-mode");
      localStorage.setItem("darkMode", isDark);
      darkBtn.textContent = isDark ? "☀️ Light Mode" : "🌙 Dark Mode";
    });
  }
});

function initializeApp() {
  console.log("=== APP INITIALIZING ===");
  displayCurrentDate();
  displayHadithOfDay();
  setupEventListeners();

  // Load prayer times immediately with default location
  console.log("Loading prayer times for Sarajevo...");
  currentLocation = "Sarajevo (Default)";
  document.getElementById("locationName").innerHTML =
    "<i class='fas fa-location-dot'></i> Sarajevo";
  fetchPrayerTimes(43.9159, 18.4131, "Sarajevo");

  // Then try to get user's actual location
  attemptGeolocation();

  // Update prayer times every minute
  setInterval(updatePrayerHighlight, 60000);

  // Update hadith at midnight
  setInterval(function () {
    if (isNewDay()) {
      displayHadithOfDay();
    }
  }, 60000);
}

// ==========================================
// EVENT LISTENERS
// ==========================================

function setupEventListeners() {
  const searchBtn = document.getElementById("searchBtn");
  const gpsBtn = document.getElementById("gpsBtn");
  const locationInput = document.getElementById("locationInput");
  const nextHadithBtn = document.getElementById("nextHadithBtn");
  const prevHadithBtn = document.getElementById("prevHadithBtn");
  const randomHadithBtn = document.getElementById("randomHadithBtn");

  if (searchBtn) searchBtn.addEventListener("click", handleLocationSearch);
  if (gpsBtn) gpsBtn.addEventListener("click", handleGeolocation);
  if (locationInput) {
    locationInput.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        handleLocationSearch();
      }
    });
  }

  if (nextHadithBtn) nextHadithBtn.addEventListener("click", nextHadith);
  if (prevHadithBtn) prevHadithBtn.addEventListener("click", previousHadith);
  if (randomHadithBtn) randomHadithBtn.addEventListener("click", randomHadith);
}

// ==========================================
// DATE & TIME FUNCTIONS
// ==========================================

function displayCurrentDate() {
  const dateOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-US", dateOptions);
  const dateDisplay = document.getElementById("dateDisplay");
  if (dateDisplay) {
    dateDisplay.textContent = formattedDate;
  }
  // Set today date in today-date-box
  const todayGregorian = document.getElementById("todayGregorian");
  if (todayGregorian) {
    const shortDate = today.toLocaleDateString("en-GB");
    todayGregorian.textContent = shortDate;
  }
}

// ==========================================
// LOCATION HANDLING
// ==========================================

function handleLocationSearch() {
  const locationInput = document.getElementById("locationInput");
  const location = locationInput.value.trim();

  if (!location) {
    showError("Please enter a city name");
    return;
  }

  geocodeLocation(location);
}

function handleGeolocation() {
  if (navigator.geolocation) {
    showLoading(true);
    navigator.geolocation.getCurrentPosition(
      function (position) {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        currentCoordinates = { latitude: lat, longitude: lng };
        console.log("Got user location:", lat, lng);
        fetchPrayerTimes(lat, lng);
        reverseGeocode(lat, lng);
      },
      function (error) {
        console.log("Geolocation error:", error);
        showError("Unable to access your location. Please enter manually.");
        showLoading(false);
      },
    );
  } else {
    showError("Geolocation is not supported by your browser");
  }
}

function geocodeLocation(locationName) {
  showLoading(true);
  console.log("Geocoding location:", locationName);

  const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(locationName)}&format=json&limit=1`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (data && data.length > 0) {
        const lat = data[0].lat;
        const lng = data[0].lon;
        const name = data[0].display_name.split(",")[0];

        currentCoordinates = { latitude: lat, longitude: lng };
        currentLocation = name;

        console.log("Found location:", name, lat, lng);

        document.getElementById("locationName").innerHTML =
          `<i class='fas fa-location-dot'></i> ${name}`;
        document.getElementById("locationInput").value = "";

        fetchPrayerTimes(lat, lng, name);
      } else {
        showError("Location not found. Please try another search.");
        showLoading(false);
      }
    })
    .catch((error) => {
      console.error("Geocoding error:", error);
      showError("Error searching for location: " + error.message);
      showLoading(false);
    });
}

function reverseGeocode(lat, lng) {
  console.log("Reverse geocoding:", lat, lng);
  const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (data && data.address) {
        const city =
          data.address.city ||
          data.address.town ||
          data.address.village ||
          "Unknown Location";
        currentLocation = city;
        console.log("Reverse geocoded to:", city);
        document.getElementById("locationName").innerHTML =
          `<i class='fas fa-location-dot'></i> ${city}`;
      }
    })
    .catch((error) => console.error("Reverse geocoding error:", error));
}

// ==========================================
// PRAYER TIMES API
// ==========================================

function fetchPrayerTimes(latitude, longitude, locationName = null) {
  showLoading(true);

  const url = `https://api.aladhan.com/v1/timings?latitude=${latitude}&longitude=${longitude}&method=4`;

  console.log("=== FETCHING PRAYER TIMES ===");
  console.log("URL:", url);
  console.log("Location:", locationName || "Unknown");

  fetch(url)
    .then((response) => {
      console.log("Response status:", response.status);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log("API Response:", data);

      if (data && data.code === 200) {
        currentPrayerTimes = data.data.timings;
        currentIslamicDate = data.data.date.hijri;

        console.log("Prayer Times Data:", currentPrayerTimes);
        console.log("Islamic Date:", currentIslamicDate);

        displayPrayerTimes(currentPrayerTimes);
        displayIslamicDate(currentIslamicDate);
        showLoading(false);
      } else {
        throw new Error("Invalid API response");
      }
    })
    .catch((error) => {
      console.error("Fetch error:", error);
      showError("Error fetching prayer times: " + error.message);
      showLoading(false);
    });
}

// ==========================================
// DISPLAY PRAYER TIMES
// ==========================================

function displayPrayerTimes(timings) {
  console.log("=== DISPLAYING PRAYER TIMES ===");
  console.log("Timings object:", timings);

  const container = document.getElementById("prayerTimesContainer");
  if (!container) {
    console.error("Prayer times container not found!");
    return;
  }

  container.innerHTML = "";

  // Prayer list with API keys and translations
  const prayers = [
    {
      apiKey: "Fajr",
      en: "Fajr",
      ar: "الفجر",
      bs: "Zora",
    },
    {
      apiKey: "Sunrise",
      en: "Sunrise",
      ar: "الشروق",
      bs: "Izlazak sunca",
    },
    {
      apiKey: "Dhuhr",
      en: "Dhuhr",
      ar: "الظهر",
      bs: "Podne",
    },
    {
      apiKey: "Asr",
      en: "Asr",
      ar: "العصر",
      bs: "Ikindija",
    },
    {
      apiKey: "Maghrib",
      en: "Maghrib",
      ar: "المغرب",
      bs: "Aksam",
    },
    {
      apiKey: "Isha",
      en: "Isha",
      ar: "العشاء",
      bs: "Jacija",
    },
  ];

  let prayerCount = 0;

  prayers.forEach((prayer) => {
    const time = timings[prayer.apiKey];

    if (time) {
      prayerCount++;
      console.log(`Creating card for ${prayer.apiKey}: ${time}`);

      const card = document.createElement("div");
      card.className = "prayer-card";
      card.id = `prayer-${prayer.apiKey.toLowerCase()}`;

      card.innerHTML = `
        <div class="prayer-name">${prayer.en}<br><span class="prayer-bosnian">(${prayer.bs})</span></div>
        <div class="prayer-time">${time}</div>
        <div class="prayer-arabic">${prayer.ar}</div>
      `;

      container.appendChild(card);
    } else {
      console.warn(`No time found for ${prayer.apiKey}`);
    }
  });

  console.log(`Created ${prayerCount} prayer cards`);

  // Update highlighting
  updatePrayerHighlight();
}

// ==========================================
// HIGHIGHT NEXT PRAYER
// ==========================================

function updatePrayerHighlight() {
  if (!currentPrayerTimes) {
    console.log("No prayer times to highlight");
    return;
  }

  console.log("=== UPDATING PRAYER HIGHLIGHT ===");

  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const currentTimeString = `${hours}:${minutes}`;

  console.log("Current time:", currentTimeString);

  const prayers = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];
  let nextPrayer = null;
  let nextPrayerTime = null;

  // Remove active class from all cards
  document.querySelectorAll(".prayer-card").forEach((card) => {
    card.classList.remove("active");
  });

  // Find next prayer
  for (let prayer of prayers) {
    const prayerTime = currentPrayerTimes[prayer];

    if (prayerTime && prayerTime > currentTimeString) {
      nextPrayer = prayer;
      nextPrayerTime = prayerTime;
      console.log("Next prayer found:", prayer, "at", prayerTime);
      break;
    }
  }

  // If no prayer found today, next is Fajr
  if (!nextPrayer) {
    nextPrayer = "Fajr";
    nextPrayerTime = currentPrayerTimes["Fajr"];
    console.log("No more prayers today, next is Fajr tomorrow");
  }

  // Highlight the next prayer
  const cardId = `prayer-${nextPrayer.toLowerCase()}`;
  const nextPrayerCard = document.getElementById(cardId);

  console.log("Looking for element with id:", cardId);
  console.log("Found:", !!nextPrayerCard);

  if (nextPrayerCard) {
    nextPrayerCard.classList.add("active");

    // Add countdown
    const countdown = calculateCountdown(nextPrayerTime);
    let countdownEl = nextPrayerCard.querySelector(".prayer-countdown");

    if (countdownEl) {
      countdownEl.textContent = `Next in ${countdown}`;
    } else {
      countdownEl = document.createElement("div");
      countdownEl.className = "prayer-countdown";
      countdownEl.textContent = `Next in ${countdown}`;
      nextPrayerCard.appendChild(countdownEl);
    }

    console.log("Highlighted:", nextPrayer);
  }
}

function calculateCountdown(timeString) {
  const [hours, minutes] = timeString.split(":").map(Number);
  const prayerTime = new Date();
  prayerTime.setHours(hours, minutes, 0);

  // If prayer time has passed, it's tomorrow
  if (prayerTime < new Date()) {
    prayerTime.setDate(prayerTime.getDate() + 1);
  }

  const now = new Date();
  const diff = prayerTime - now;

  const hours_left = Math.floor(diff / (1000 * 60 * 60));
  const minutes_left = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  if (hours_left > 0) {
    return `${hours_left}h ${minutes_left}m`;
  } else if (minutes_left > 0) {
    return `${minutes_left}m ${seconds}s`;
  } else {
    return `${seconds}s`;
  }
}

// ==========================================
// ISLAMIC DATE
// ==========================================

function displayIslamicDate(hijriDate) {
  if (!hijriDate) return;

  console.log("Islamic date:", hijriDate);

  const islamicMonths = [
    "Muharram",
    "Safar",
    "Rabi' al-Awwal",
    "Rabi' al-Thani",
    "Jumada al-Awwal",
    "Jumada al-Thani",
    "Rajab",
    "Sha'ban",
    "Ramadan",
    "Shawwal",
    "Dhu al-Qi'dah",
    "Dhu al-Hijjah",
  ];

  const islamicMonthsAr = [
    "محرم",
    "صفر",
    "ربيع الأول",
    "ربيع الثاني",
    "جمادى الأولى",
    "جمادى الثانية",
    "رجب",
    "شعبان",
    "رمضان",
    "شوال",
    "ذو القعدة",
    "ذو الحجة",
  ];

  const month = islamicMonths[hijriDate.month.number - 1];
  const monthAr = islamicMonthsAr[hijriDate.month.number - 1];
  const container = document.getElementById("islamicDateContainer");

  if (container) {
    container.innerHTML = `
      <h3><i class='fas fa-moon'></i> Islamic Calendar</h3>
      <p>${hijriDate.day} ${month} ${hijriDate.year} AH</p>
      <p>${hijriDate.day} ${monthAr} ${hijriDate.year} هـ</p>
    `;
  }
}

// ==========================================
// HADITH FUNCTIONS
// ==========================================

function displayHadithOfDay() {
  const hadith = getHadithOfDay();
  displayHadith(hadith);
}

function displayHadith(hadith) {
  const englishEl = document.getElementById("hadithEnglish");
  const arabicEl = document.getElementById("hadithArabic");
  const bosnianEl = document.getElementById("hadithBosnian");

  if (englishEl) englishEl.textContent = hadith.english;
  if (arabicEl) arabicEl.textContent = hadith.arabic;
  if (bosnianEl) bosnianEl.textContent = hadith.bosnian;

  // Update current hadith index
  currentHadithIndex = hadithData.findIndex((h) => h.id === hadith.id);
}

function nextHadith() {
  currentHadithIndex = (currentHadithIndex + 1) % hadithData.length;
  displayHadith(hadithData[currentHadithIndex]);
}

function previousHadith() {
  currentHadithIndex =
    (currentHadithIndex - 1 + hadithData.length) % hadithData.length;
  displayHadith(hadithData[currentHadithIndex]);
}

function randomHadith() {
  const randomIndex = Math.floor(Math.random() * hadithData.length);
  currentHadithIndex = randomIndex;
  displayHadith(hadithData[randomIndex]);
}

// ==========================================
// UI FUNCTIONS
// ==========================================

function showLoading(show) {
  const spinner = document.getElementById("loadingSpinner");
  if (spinner) {
    spinner.style.display = show ? "block" : "none";
  }
}

function showError(message) {
  console.error("Error:", message);
  const container = document.getElementById("prayerTimesContainer");

  if (!container) return;

  const errorDiv = document.createElement("div");
  errorDiv.className = "error";
  errorDiv.textContent = message;

  // Remove previous errors
  const previousErrors = container.querySelectorAll(".error");
  previousErrors.forEach((err) => err.remove());

  container.insertBefore(errorDiv, container.firstChild);

  // Auto remove error after 5 seconds
  setTimeout(() => {
    if (errorDiv.parentNode) {
      errorDiv.remove();
    }
  }, 5000);
}

// ==========================================
// GEOLOCATION
// ==========================================

function attemptGeolocation() {
  if (!navigator.geolocation) {
    console.log("Geolocation not supported");
    document.getElementById("locationName").innerHTML =
      "<i class='fas fa-location-dot'></i> Sarajevo";
    return;
  }

  console.log("Attempting to get user location...");

  const timeoutId = setTimeout(() => {
    console.log("Geolocation timeout");
    document.getElementById("locationName").innerHTML =
      "<i class='fas fa-location-dot'></i> Sarajevo";
  }, 8000);

  navigator.geolocation.getCurrentPosition(
    function (position) {
      clearTimeout(timeoutId);
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      currentCoordinates = { latitude: lat, longitude: lng };
      console.log("Got user position:", lat, lng);
      fetchPrayerTimes(lat, lng);
      reverseGeocode(lat, lng);
    },
    function (error) {
      clearTimeout(timeoutId);
      console.log("Geolocation failed:", error.message);
      document.getElementById("locationName").innerHTML =
        "<i class='fas fa-location-dot'></i> Sarajevo";
    },
    {
      timeout: 7000,
      enableHighAccuracy: false,
    },
  );
}

// ==========================================
// UTILITY FUNCTIONS
// ==========================================

let lastDate = new Date().toDateString();
function isNewDay() {
  const today = new Date().toDateString();
  if (today !== lastDate) {
    lastDate = today;
    return true;
  }
  return false;
}

// Keyboard shortcuts
document.addEventListener("keydown", function (event) {
  if (event.key === "ArrowRight") {
    nextHadith();
  } else if (event.key === "ArrowLeft") {
    previousHadith();
  }
});

console.log("Script loaded successfully!");
