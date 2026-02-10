// Main JavaScript for Islamic Prayer Times App

// Global variables
let currentLocation = null;
let currentPrayerTimes = null;
let currentIslamicDate = null;
let currentHadithIndex = 0;
let currentCoordinates = null;

// Initialize the app when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  initializeApp();
});

// Initialize the app
function initializeApp() {
  displayCurrentDate();
  displayHadithOfDay();
  setupEventListeners();
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

// Setup event listeners
function setupEventListeners() {
  const searchBtn = document.getElementById("searchBtn");
  const gpsBtn = document.getElementById("gpsBtn");
  const locationInput = document.getElementById("locationInput");
  const nextHadithBtn = document.getElementById("nextHadithBtn");
  const prevHadithBtn = document.getElementById("prevHadithBtn");
  const randomHadithBtn = document.getElementById("randomHadithBtn");

  searchBtn.addEventListener("click", handleLocationSearch);
  gpsBtn.addEventListener("click", handleGeolocation);
  locationInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      handleLocationSearch();
    }
  });

  nextHadithBtn.addEventListener("click", nextHadith);
  prevHadithBtn.addEventListener("click", previousHadith);
  randomHadithBtn.addEventListener("click", randomHadith);
}

// Display current date
function displayCurrentDate() {
  const dateOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-US", dateOptions);
  document.getElementById("dateDisplay").textContent = formattedDate;
}

// Handle location search
function handleLocationSearch() {
  const locationInput = document.getElementById("locationInput");
  const location = locationInput.value.trim();

  if (!location) {
    showError("Please enter a city name");
    return;
  }

  geocodeLocation(location);
}

// Handle geolocation
function handleGeolocation() {
  if (navigator.geolocation) {
    showLoading(true);
    navigator.geolocation.getCurrentPosition(
      function (position) {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        currentCoordinates = { latitude: lat, longitude: lng };
        fetchPrayerTimes(lat, lng);
        reverseGeocode(lat, lng);
      },
      function (error) {
        showError("Unable to access your location. Please enter manually.");
        showLoading(false);
      },
    );
  } else {
    showError("Geolocation is not supported by your browser");
  }
}

// Geocode location name to coordinates
function geocodeLocation(locationName) {
  showLoading(true);

  // Using Nominatim free geocoding service (no API key required)
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

        document.getElementById("locationName").textContent = `📍 ${name}`;
        document.getElementById("locationInput").value = "";

        fetchPrayerTimes(lat, lng);
      } else {
        showError("Location not found. Please try another search.");
        showLoading(false);
      }
    })
    .catch((error) => {
      showError("Error searching for location: " + error.message);
      showLoading(false);
    });
}

// Reverse geocode coordinates to location name
function reverseGeocode(lat, lng) {
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
        document.getElementById("locationName").textContent = `📍 ${city}`;
      }
    })
    .catch((error) => console.log("Reverse geocoding error:", error));
}

// Fetch prayer times from Aladhan API
function fetchPrayerTimes(latitude, longitude) {
  showLoading(true);

  // Using Aladhan API for prayer times (free, no API key required)
  const url = `https://api.aladhan.com/v1/timings?latitude=${latitude}&longitude=${longitude}&method=4&units=24h`;

  console.log("[Prayer Times] Fetching from:", url);

  fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => {
      console.log("[Prayer Times] Response status:", response.status);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log("[Prayer Times] Received data:", data);

      if (data.code === 200) {
        currentPrayerTimes = data.data.timings;
        currentIslamicDate = data.data.date.hijri;

        console.log("[Prayer Times] Prayer times:", currentPrayerTimes);
        console.log("[Prayer Times] Islamic date:", currentIslamicDate);

        displayPrayerTimes(currentPrayerTimes);
        displayIslamicDate(currentIslamicDate);
        showLoading(false);
      } else {
        throw new Error(`API returned error code: ${data.code} - ${data.data}`);
      }
    })
    .catch((error) => {
      console.error("[Prayer Times] Fetch error:", error);
      showError("Error fetching prayer times: " + error.message);
      showLoading(false);
    });
}

// Display prayer times
function displayPrayerTimes(timings) {
  const container = document.getElementById("prayerTimesContainer");
  container.innerHTML = "";

  // Map prayer names to API keys
  const prayerMapping = [
    { name: "Fajr", apiKey: "Fajr" },
    { name: "Sunrise", apiKey: "Sunrise" },
    { name: "Dhuhr", apiKey: "Dhuhr" },
    { name: "Asr", apiKey: "Asr" },
    { name: "Maghrib", apiKey: "Maghrib" },
    { name: "Isha", apiKey: "Isha" },
  ];

  prayerMapping.forEach((prayer) => {
    const time = timings[prayer.apiKey];

    if (time) {
      const card = document.createElement("div");
      card.className = "prayer-card";
      card.id = `prayer-${prayer.apiKey.toLowerCase()}`;

      const prayerKey = prayer.apiKey.toLowerCase();
      const prayerNameObj = prayerNames[prayerKey] || {
        en: prayer.name,
        ar: "",
        bs: "",
      };

      card.innerHTML = `
                <div class="prayer-name">${prayerNameObj.en}</div>
                <div class="prayer-time">${time}</div>
                <div class="prayer-arabic">${prayerNameObj.ar}</div>
            `;

      container.appendChild(card);
    }
  });

  // Update highlighting
  updatePrayerHighlight();
}

// Update which prayer is active/current
function updatePrayerHighlight() {
  if (!currentPrayerTimes) return;

  const now = new Date();
  const currentTimeString =
    String(now.getHours()).padStart(2, "0") +
    ":" +
    String(now.getMinutes()).padStart(2, "0");

  const prayersToCheck = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];
  let nextPrayer = null;
  let nextPrayerTime = null;

  // Remove active class from all
  document.querySelectorAll(".prayer-card").forEach((card) => {
    card.classList.remove("active");
  });

  // Find next prayer and highlight it
  for (let prayer of prayersToCheck) {
    const prayerTime = currentPrayerTimes[prayer];

    if (prayerTime && prayerTime > currentTimeString) {
      nextPrayer = prayer.toLowerCase();
      nextPrayerTime = prayerTime;
      break;
    }
  }

  // If no prayer found today, next is Fajr tomorrow
  if (!nextPrayer) {
    nextPrayer = "fajr";
    nextPrayerTime = currentPrayerTimes["Fajr"];
  }

  // Highlight the next prayer
  const nextPrayerCard = document.getElementById(`prayer-${nextPrayer}`);
  if (nextPrayerCard) {
    nextPrayerCard.classList.add("active");

    // Add countdown
    const countdown = calculateCountdown(nextPrayerTime);
    const countdownEl = document.createElement("div");
    countdownEl.className = "prayer-countdown";
    countdownEl.textContent = `Next in ${countdown}`;

    const existingCountdown = nextPrayerCard.querySelector(".prayer-countdown");
    if (existingCountdown) {
      existingCountdown.textContent = countdownEl.textContent;
    } else {
      nextPrayerCard.appendChild(countdownEl);
    }
  }
}

// Calculate countdown to prayer time
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

  if (hours_left > 0) {
    return `${hours_left}h ${minutes_left}m`;
  } else {
    return `${minutes_left}m`;
  }
}

// Display Islamic Date
function displayIslamicDate(hijriDate) {
  if (!hijriDate) return;

  const month = islamicMonths[hijriDate.month.number - 1];
  const container = document.getElementById("islamicDateContainer");

  container.innerHTML = `
        <h3>🌙 Islamic Calendar</h3>
        <p>${hijriDate.day} ${month.en} ${hijriDate.year} AH</p>
        <p>${hijriDate.day} ${month.ar} ${hijriDate.year} هـ</p>
    `;
}

// Display Hadith of the Day
function displayHadithOfDay() {
  const hadith = getHadithOfDay();
  displayHadith(hadith);
}

// Display specific hadith
function displayHadith(hadith) {
  document.getElementById("hadithEnglish").textContent = hadith.english;
  document.getElementById("hadithArabic").textContent = hadith.arabic;
  document.getElementById("hadithBosnian").textContent = hadith.bosnian;

  // Update current hadith index
  currentHadithIndex = hadithData.findIndex((h) => h.id === hadith.id);
}

// Next hadith
function nextHadith() {
  currentHadithIndex = (currentHadithIndex + 1) % hadithData.length;
  displayHadith(hadithData[currentHadithIndex]);
}

// Previous hadith
function previousHadith() {
  currentHadithIndex =
    (currentHadithIndex - 1 + hadithData.length) % hadithData.length;
  displayHadith(hadithData[currentHadithIndex]);
}

// Random hadith
function randomHadith() {
  const randomIndex = Math.floor(Math.random() * hadithData.length);
  currentHadithIndex = randomIndex;
  displayHadith(hadithData[randomIndex]);
}

// Check if day has changed
let lastDate = new Date().toDateString();
function isNewDay() {
  const today = new Date().toDateString();
  if (today !== lastDate) {
    lastDate = today;
    return true;
  }
  return false;
}

// Show/hide loading spinner
function showLoading(show) {
  const spinner = document.getElementById("loadingSpinner");
  const container = document.getElementById("prayerTimesContainer");

  if (show) {
    if (spinner) spinner.style.display = "block";
    if (container) container.innerHTML = "";
  } else {
    if (spinner) spinner.style.display = "none";
  }
}

// Show error message
function showError(message) {
  const container = document.getElementById("prayerTimesContainer");

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

// Attempt to load prayer times on app start using default location
function attemptGeolocation() {
  // Try to get location automatically
  if (navigator.geolocation) {
    const geolocationTimeout = setTimeout(() => {
      console.log("[Geolocation] Timeout - using default location (Sarajevo)");
      fetchPrayerTimes(43.9159, 18.4131); // Sarajevo coordinates
      document.getElementById("locationName").textContent =
        "📍 Sarajevo (Default)";
    }, 8000); // 8 second timeout

    navigator.geolocation.getCurrentPosition(
      function (position) {
        clearTimeout(geolocationTimeout);
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        currentCoordinates = { latitude: lat, longitude: lng };
        console.log("[Geolocation] Got position:", lat, lng);
        fetchPrayerTimes(lat, lng);
        reverseGeocode(lat, lng);
      },
      function (error) {
        clearTimeout(geolocationTimeout);
        // If geolocation fails, use default location (example: Sarajevo)
        console.log("[Geolocation] Failed:", error.message);
        fetchPrayerTimes(43.9159, 18.4131); // Sarajevo coordinates
        document.getElementById("locationName").textContent =
          "📍 Sarajevo (Default)";
      },
      {
        timeout: 7000, // 7 second timeout for the geolocation call
        enableHighAccuracy: false, // Don't need high accuracy
      },
    );
  } else {
    // Fallback to Sarajevo
    console.log("[Geolocation] Not supported - using Sarajevo");
    fetchPrayerTimes(43.9159, 18.4131);
    document.getElementById("locationName").textContent =
      "📍 Sarajevo (Default)";
  }
}

// Add keyboard shortcuts
document.addEventListener("keydown", function (event) {
  if (event.key === "ArrowRight") {
    nextHadith();
  } else if (event.key === "ArrowLeft") {
    previousHadith();
  }
});

// Progressive Web App support (optional)
if ("serviceWorker" in navigator) {
  // Service worker can be added later for offline support
  // navigator.serviceWorker.register('sw.js');
}
