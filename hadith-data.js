// Hadith Database with English, Arabic, and Bosnian translations
const hadithData = [
  {
    id: 1,
    english:
      "The best of you are those who are best to their families, and I am the best among you to my family. - Prophet Muhammad (Tirmidhi)",
    arabic:
      "خيركم خيركم لأهله، وأنا خيركم لأهلي. - النبي محمد صلى الله عليه وسلم (الترمذي)",
    bosnian:
      "Najbolji među vama su oni koji su najbolji prema svojoj porodici, a ja sam najbolji među vama prema svojoj porodici. - Prorок Muhammad (Tirmidhi)",
  },
  {
    id: 2,
    english: "Verily, with hardship comes ease. - Quran (94:5-6)",
    arabic: "فإن مع العسر يسرا. - القرآن الكريم (94:5-6)",
    bosnian: "Doista, sa težačom dolazi olakšanje. - Kuran (94:5-6)",
  },
  {
    id: 3,
    english:
      "The greatest wealth is the richness of the soul. - Prophet Muhammad",
    arabic:
      "ليس الغنى بكثرة العرض، إنما الغنى غنى النفس. - النبي محمد صلى الله عليه وسلم",
    bosnian:
      "Prava bogatstva nije mnogoće imanja, već bogatstvo duše. - Prorок Muhammad",
  },
  {
    id: 4,
    english: "Seek knowledge even if it is in China. - Prophet Muhammad",
    arabic: "اطلبوا العلم ولو بالصين. - النبي محمد صلى الله عليه وسلم",
    bosnian:
      "Potražite znanje čak i ako se on nalazi u Kini. - Prorок Muhammad",
  },
  {
    id: 5,
    english: "The best deeds are done with the best intentions. - Imam Nawawi",
    arabic: "إنما الأعمال بالنيات وإنما لكل امرئ ما نوى. - الإمام النووي",
    bosnian: "Doista, svaki posao se mjeri prema namerи. - Imam An-Nawawi",
  },
  {
    id: 6,
    english:
      "Kindness to parents is a great deed. Show mercy even if one of them or both of them reach old age in your life. - Quran (17:23-24)",
    arabic: "واخفض لهما جناح الذل من الرحمة. - القرآن الكريم (17:23-24)",
    bosnian:
      "Budi ljubazan prema roditeljima, jer je pokazivanje milosrđa prema njima veliki čin. - Kuran (17:23-24)",
  },
  {
    id: 7,
    english:
      "A person is not a believer who fills his stomach while his neighbor is hungry. - Prophet Muhammad",
    arabic:
      "لا يؤمن أحدكم حتى يحب لأخيه ما يحب لنفسه. - النبي محمد صلى الله عليه وسلم",
    bosnian:
      "Nije vjerujući onaj koji se site dok njegov susjed glada. - Prorок Muhammad",
  },
  {
    id: 8,
    english:
      "Righteousness is good morality, and sin is that which wavers in your heart. - Prophet Muhammad",
    arabic:
      "البر حسن الخلق، والإثم ما حاك في صدرك. - النبي محمد صلى الله عليه وسلم",
    bosnian:
      "Pobožnost je dobar karakter, a grijeh je ono što se okeva u tvom srcu. - Prorок Muhammad",
  },
  {
    id: 9,
    english:
      "The believer's shade on the Day of Resurrection will be his charity. - Prophet Muhammad",
    arabic: "الصدقة تطفئ غضب الرب. - النبي محمد صلى الله عليه وسلم",
    bosnian:
      "Sjena vjerujućega na Dan Procjene će biti njegova dobrohotnost. - Prorок Muhammad",
  },
  {
    id: 10,
    english:
      "When you see a person who has been favored by Allah, help him. - Prophet Muhammad",
    arabic: "إذا رأيت ذا عقل فالزمه. - النبي محمد صلى الله عليه وسلم",
    bosnian:
      "Kada vidite osobu kojoj je Allah dao blagodati, pomozite joj. - Prorок Muhammad",
  },
  {
    id: 11,
    english:
      "The most perfect of believers in faith are the best of them in character. - Prophet Muhammad",
    arabic:
      "أكمل المؤمنين إيماناً أحسنهم خلقاً. - النبي محمد صلى الله عليه وسلم",
    bosnian:
      "Najevanđeličniji od vjerujućih su oni sa najboljim karakterom. - Prorок Muhammad",
  },
  {
    id: 12,
    english: "Speak a good word or remain silent. - Prophet Muhammad",
    arabic:
      "من كان يؤمن بالله واليوم الآخر فليقل خيراً أو ليصمت. - النبي محمد صلى الله عليه وسلم",
    bosnian: "Izgovori dobroju reč ili zašutи. - Prorок Muhammad",
  },
  {
    id: 13,
    english:
      "The best act of worship is the one done at the right time. - Imam Ahmad",
    arabic: "أفضل الأعمال أحكمها. - الإمام أحمد",
    bosnian:
      "Najbolji čin obožavanja je onaj koji se vrši u pravo vrijeme. - Imam Ahmad",
  },
  {
    id: 14,
    english: "Every soul will taste death. - Quran (3:185)",
    arabic: "كل نفس ذائقة الموت. - القرآن الكريم (3:185)",
    bosnian: "Svaka duša će okusiti smrt. - Kuran (3:185)",
  },
  {
    id: 15,
    english:
      "The dunia (worldly life) is but a play and amusement - Quran (47:36)",
    arabic: "الحياة الدنيا لهو ولعب. - القرآن الكريم (47:36)",
    bosnian: "Svjetski život je samo igra i zabava. - Kuran (47:36)",
  },
  {
    id: 16,
    english: "A smile is a charity. - Prophet Muhammad",
    arabic: "تبسمك في وجه أخيك لك صدقة. - النبي محمد صلى الله عليه وسلم",
    bosnian: "Osmijeh je milosrđe. - Prorок Muhammad",
  },
  {
    id: 17,
    english:
      "The best of people are those who are most beneficial to others. - Prophet Muhammad",
    arabic: "خير الناس أنفعهم للناس. - النبي محمد صلى الله عليه وسلم",
    bosnian:
      "Najbolji ljudi su oni koji su najkorisniјi drugimа. - Prorок Muhammad",
  },
  {
    id: 18,
    english:
      "Whoever believes in Allah and the Last Day, let him speak good or remain silent. - Hadith",
    arabic: "من كان يؤمن بالله واليوم الآخر فليقل خيراً أو ليصمت. - حديث",
    bosnian:
      "Onaj koji vjeruje u Allaha i Zadnji dan, neka govori dobro ili zašutи. - Hadith",
  },
  {
    id: 19,
    english: "The cure for ignorance is to ask. - Prophet Muhammad",
    arabic: "الحياء من الإيمان. - النبي محمد صلى الله عليه وسلم",
    bosnian: "Lijek za neznanje je postavljanje pitanja. - Prorок Muhammad",
  },
  {
    id: 20,
    english:
      "All of you are shepherds and each is responsible for his flock. - Prophet Muhammad",
    arabic: "كلكم راع وكل راع مسؤول عن رعيته. - النبي محمد صلى الله عليه وسلم",
    bosnian:
      "Svi ste čuvari i svaki je odgovoran za svoju porodicu. - Prorок Muhammad",
  },
  {
    id: 21,
    english:
      "The month of Ramadan is the month of blessings. - Prophet Muhammad",
    arabic: "شهر رمضان شهر التوبة. - النبي محمد صلى الله عليه وسلم",
    bosnian:
      "Mjesec Ramazan je mjesec milosrđa i blagoslova. - Prorок Muhammad",
  },
  {
    id: 22,
    english: "There is no harm or reciprocal harm in Islam. - Prophet Muhammad",
    arabic: "لا ضرر ولا ضرار. - النبي محمد صلى الله عليه وسلم",
    bosnian: "Nema štete ili uzajamne štete u islamu. - Prorок Muhammad",
  },
  {
    id: 23,
    english: "The best gift is that which grows in value. - Imam Ghazali",
    arabic: "أفضل الهدية ما تزداد قيمته بمرور الزمن. - الإمام الغزالي",
    bosnian: "Najbolji dar je onaj koji raste u vrijednosti. - Imam Al-Ghazali",
  },
  {
    id: 24,
    english: "Keep your promises and fulfill your trusts. - Quran (8:27)",
    arabic:
      "يا أيها الذين آمنوا لا تخونوا الله والرسول. - القرآن الكريم (8:27)",
    bosnian:
      "Čuvajte svoje obещanja i ispunite svoja poverenja. - Kuran (8:27)",
  },
  {
    id: 25,
    english: "Verily, Allah is with the patient. - Quran (2:153)",
    arabic: "إن الله مع الصابرين. - القرآن الكريم (2:153)",
    bosnian: "Doista, Allah je sa strpljivima. - Kuran (2:153)",
  },
  {
    id: 26,
    english: "Fear Allah wherever you may be. - Prophet Muhammad",
    arabic: "اتق الله حيثما كنت. - النبي محمد صلى الله عليه وسلم",
    bosnian: "Boj se Allaha gdje god bio. - Prorок Muhammad",
  },
  {
    id: 27,
    english:
      "Love for your brother what you love for yourself. - Prophet Muhammad",
    arabic:
      "لا يؤمن أحدكم حتى يحب لأخيه ما يحب لنفسه. - النبي محمد صلى الله عليه وسلم",
    bosnian: "Voli svoju braću ono što voljuš sebi. - Prorок Muhammad",
  },
  {
    id: 28,
    english:
      "The strongest among you is the one who controls his anger. - Prophet Muhammad",
    arabic:
      "ليس الشديد بالصرعة، إنما الشديد الذي يملك نفسه عند الغضب. - النبي محمد صلى الله عليه وسلم",
    bosnian:
      "Najjači među vama je onaj koji kontroliše svoju ljutnju. - Prorок Muhammad",
  },
  {
    id: 29,
    english:
      "Repent to Allah in secret as you would repent in public. - Imam Ali",
    arabic: "توب إلى الله في السر كما تتوب في العلن. - الإمام علي",
    bosnian:
      "Pokajte se pred Allahom u tajnosti kao što se kajete na javnom mjestu. - Imam Ali",
  },
  {
    id: 30,
    english:
      "The most beloved deeds to Allah are those done consistently, even if small. - Prophet Muhammad",
    arabic:
      "أحب الأعمال إلى الله تعالى أدومها وإن قلت. - النبي محمد صلى الله عليه وسلم",
    bosnian:
      "Najpoljubljiviji čini Allahu su oni koji se čine dosljedno, čak i ako su mali. - Prorок Muhammad",
  },
];

// Function to get hadith by index
function getHadithByIndex(index) {
  return hadithData[index % hadithData.length];
}

// Function to get random hadith
function getRandomHadith() {
  return hadithData[Math.floor(Math.random() * hadithData.length)];
}

// Function to get hadith of the day
function getHadithOfDay() {
  const today = new Date();
  const dayOfYear = Math.floor(
    (today - new Date(today.getFullYear(), 0, 0)) / 86400000,
  );
  return getHadithByIndex(dayOfYear);
}

// Prayer names in different languages
const prayerNames = {
  fajr: { en: "Fajr", ar: "الفجر", bs: "Sabah" },
  sunrise: { en: "Sunrise", ar: "الشروق", bs: "Izlazak sunca" },
  dhuhr: { en: "Dhuhr", ar: "الظهر", bs: "Podne" },
  asr: { en: "Asr", ar: "العصر", bs: "Srednja" },
  maghrib: { en: "Maghrib", ar: "المغرب", bs: "Zalazak sunca" },
  isha: { en: "Isha", ar: "العشاء", bs: "Noćna" },
};

// Months in Islamic calendar with translations
const islamicMonths = [
  { en: "Muharram", ar: "محرم" },
  { en: "Safar", ar: "صفر" },
  { en: "Rabi' al-Awwal", ar: "ربيع الأول" },
  { en: "Rabi' al-Thani", ar: "ربيع الثاني" },
  { en: "Jumada al-Awwal", ar: "جمادى الأولى" },
  { en: "Jumada al-Thani", ar: "جمادى الثانية" },
  { en: "Rajab", ar: "رجب" },
  { en: "Sha'ban", ar: "شعبان" },
  { en: "Ramadan", ar: "رمضان" },
  { en: "Shawwal", ar: "شوال" },
  { en: "Dhu al-Qi'dah", ar: "ذو القعدة" },
  { en: "Dhu al-Hijjah", ar: "ذو الحجة" },
];

// Congregation times (typically some minutes before the actual prayer time)
const congregationMinutes = {
  fajr: 5,
  dhuhr: 5,
  asr: 5,
  maghrib: 3,
  isha: 5,
};
