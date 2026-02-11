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

document.addEventListener("DOMContentLoaded", function ()     {
      apiKey: "Fajr",
      en: "Fajr",
      ar: "?????",
      bs: "Zora",
    },
    {
      apiKey: "Sunrise",
      en: "Sunrise",
      ar: "??????",
      bs: "Izlazak sunca",
    },
    {
      apiKey: "Dhuhr",
      en: "Dhuhr",
      ar: "?????",
      bs: "Podne",
    },
    {
      apiKey: "Asr",
      en: "Asr",
      ar: "?????",
      bs: "Ikindija",
    },
    {
      apiKey: "Maghrib",
      en: "Maghrib",
      ar: "??????",
      bs: "Aksam",
    },
    {
      apiKey: "Isha",
      en: "Isha",
      ar: "??????",
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
// HIGHLIGHT NEXT PRAYER
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
    "????",
    "???",
    "???? ?????",
    "???? ??????",
    "????? ??????",
    "????? ???????",
    "???",
    "?????",
    "?????",
    "????",
    "?? ??????",
    "?? ?????",
  ];

  const month = islamicMonths[hijriDate.month.number - 1];
  const monthAr = islamicMonthsAr[hijriDate.month.number - 1];
  const container = document.getElementById("islamicDateContainer");

  if (container) {
    container.innerHTML = `
      <h3><i class='fas fa-moon'></i> Islamic Calendar</h3>
      <p>${hijriDate.day} ${month} ${hijriDate.year} AH</p>
      <p>${hijriDate.day} ${monthAr} ${hijriDate.year} ??</p>
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
    document.getElementById("locationName").textContent =
      "📍 Sarajevo (Default)";
    return;
  }

  console.log("Attempting to get user location...");

  const timeoutId = setTimeout(() => {
    console.log("Geolocation timeout");
    document.getElementById("locationName").textContent =
      "📍 Sarajevo (Default)";
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
      document.getElementById("locationName").textContent =
        "📍 Sarajevo (Default)";
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

