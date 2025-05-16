const zodiacSigns = [
  "Koç", "Boğa", "İkizler", "Yengeç", "Aslan", "Başak",
  "Terazi", "Akrep", "Yay", "Oğlak", "Kova", "Balık"
];

// Burç yorumları örnek veriler
const horoscopes = {
  daily: {
    "Koç": "Bugün enerji dolusun, yeni başlangıçlar için uygun.",
    "Boğa": "Sabırlı ol, fırsatlar kapını çalacak.",
    // Diğer burçlar için doldur...
  },
  weekly: {
    "Koç": "Hafta boyunca önemli kararlar alabilirsin.",
    "Boğa": "Hafta sonu sürpriz gelişmeler olabilir.",
    // Diğer burçlar için doldur...
  },
  monthly: {
    "Koç": "Bu ay kariyerinde güzel ilerlemeler olacak.",
    "Boğa": "Maddi konularda dikkatli olman gerekebilir.",
    // Diğer burçlar için doldur...
  },
  yearly: {
    "Koç": "2025 yılı senin için şanslı geçecek.",
    "Boğa": "Sağlığına dikkat etmeli ve dengede kalmalısın.",
    // Diğer burçlar için doldur...
  },
};

// Basit burç uyumu örneği (örnek tablo)
const compatibilityTable = {
  "Koç": ["Aslan", "Yay"],
  "Boğa": ["Başak", "Oğlak"],
  "İkizler": ["Terazi", "Kova"],
  "Yengeç": ["Akrep", "Balık"],
  "Aslan": ["Koç", "Yay"],
  "Başak": ["Boğa", "Oğlak"],
  "Terazi": ["İkizler", "Kova"],
  "Akrep": ["Yengeç", "Balık"],
  "Yay": ["Koç", "Aslan"],
  "Oğlak": ["Boğa", "Başak"],
  "Kova": ["İkizler", "Terazi"],
  "Balık": ["Yengeç", "Akrep"],
};

function getHoroscope(sign, period) {
  if (!horoscopes[period]) return null;
  return horoscopes[period][sign] || "Yorum bulunamadı.";
}

function getCompatibility(sign1, sign2) {
  if (!compatibilityTable[sign1]) return false;
  return compatibilityTable[sign1].includes(sign2);
}

module.exports = {
  zodiacSigns,
  getHoroscope,
  getCompatibility,
};
