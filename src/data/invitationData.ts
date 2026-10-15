export interface ScheduleItem {
  time: string;
  title: string;
  description: string;
  location: string;
  icon: "nikkah" | "welcome" | "feast" | "rukhsati" | "music";
}

export interface WeddingData {
  brand: {
    name: string;
    collection: string;
    tagline: string;
  };
  islamicHeading: {
    bismillahArabic: string;
    bismillahTranslation: string;
    quranicVerseArabic: string;
    quranicVerseTranslation: string;
    quranicReference: string;
  };
  couple: {
    bride: {
      firstName: string;
      fullName: string;
      parents: string;
    };
    groom: {
      firstName: string;
      fullName: string;
      parents: string;
    };
    monogram: string;
  };
  event: {
    formalDate: string;
    hijriDate: string;
    isoDate: string;
    time: string;
    invitationMessage: string;
    parentsBlurb: string;
    attire: string;
  };
  venue: {
    name: string;
    hall: string;
    address: string;
    cityStateZip: string;
    country: string;
    mapUrl: string;
    embedMapUrl: string;
    valetNote: string;
    image: string;
  };
  schedule: ScheduleItem[];
  rsvpDeadline: string;
  rsvpContacts: {
    name: string;
    relation: string;
    phone: string;
  }[];
  closingMessage: {
    duaArabic: string;
    quote: string;
    note: string;
  };
}

export const weddingData: WeddingData = {
  brand: {
    name: "Vowelle",
    collection: "The Romantic Bloom",
    tagline: "Every love story deserves an entrance.",
  },
  islamicHeading: {
    bismillahArabic: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
    bismillahTranslation: "In the Name of Allah, the Most Gracious, the Most Merciful",
    quranicVerseArabic: "وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً",
    quranicVerseTranslation:
      "“And of His signs is that He created for you from yourselves mates that you may find tranquility in them; and He placed between you affection and mercy.”",
    quranicReference: "Surah Ar-Rum [30:21]",
  },
  couple: {
    bride: {
      firstName: "Ayla",
      fullName: "Ayla Noor",
      parents: "Daughter of Mr. & Mrs. Tariq Mahmood",
    },
    groom: {
      firstName: "Zayan",
      fullName: "Zayan Ahmed",
      parents: "Son of Mr. & Mrs. Salman Ahmed",
    },
    monogram: "Z & A",
  },
  event: {
    formalDate: "Saturday, the Twenty-Eighth of November, Two Thousand Twenty-Six",
    hijriDate: "18 Jumada al-Awwal 1448 AH",
    isoDate: "2026-11-28T18:30:00",
    time: "Six-Thirty in the Evening",
    parentsBlurb: "Together with their families, cordially invite you to celebrate the auspicious Nikkah & Wedding Reception of their beloved children",
    invitationMessage:
      "Request the honor of your presence and heartfelt Duas to bless this sacred union in accordance with the Sunnah of Prophet Muhammad (ﷺ).",
    attire: "Traditional Festive / Formal Pakistani Attire · Royal velvet, pastel silk, and festive hues",
  },
  venue: {
    name: "The Nishat Hotel & Banquets",
    hall: "The Grand Crystal Ballroom",
    address: "9-A, Mian Mehmood Ali Kasoori Road, Gulberg III",
    cityStateZip: "Lahore, Punjab 54000",
    country: "Pakistan",
    mapUrl: "https://maps.google.com/?q=The+Nishat+Hotel+Gulberg+Lahore",
    embedMapUrl: "https://maps.google.com/maps?q=The+Nishat+Hotel+Gulberg+Lahore&t=&z=15&ie=UTF8&iwloc=&output=embed",
    valetNote: "Complimentary valet parking and executive chauffeur assistance available at the main porch.",
    image: "/images/venue-estate.jpg",
  },
  schedule: [
    {
      time: "6:30 PM",
      title: "Arrival of Guests & Welcome Refreshments",
      description: "Warm reception at the foyer with Kashmiri chai, mint lemonade, and artisanal savory treats.",
      location: "The Grand Foyer",
      icon: "welcome",
    },
    {
      time: "7:15 PM",
      title: "Barat Arrival & Milni Ceremony",
      description: "Joyous reception of the groom's family accompanied by traditional rose petal welcome.",
      location: "Main Crystal Courtyard",
      icon: "welcome",
    },
    {
      time: "7:45 PM",
      title: "Solemn Nikkah Khutbah & Vows",
      description: "Recitation of Quranic verses, Khutbah-e-Nikkah, and solemnization of the marriage (Ijab-o-Qubool).",
      location: "The Imperial Mandap",
      icon: "nikkah",
    },
    {
      time: "8:45 PM",
      title: "Royal Wedding Feast (Walima Banquet)",
      description: "A lavish traditional Mughlai dinner spread featuring live grills, dum pukht biryani, and artisanal desserts.",
      location: "The Grand Dining Pavilion",
      icon: "feast",
    },
    {
      time: "10:30 PM",
      title: "Rukhsati & Closing Duas",
      description: "Departing under the shelter of the Holy Quran with heartfelt prayers for eternal peace and barakah.",
      location: "The Main Portico",
      icon: "rukhsati",
    },
  ],
  rsvpDeadline: "November 10, 2026",
  rsvpContacts: [
    {
      name: "Tariq Mahmood",
      relation: "Bride's Father",
      phone: "+92 300 8451234",
    },
    {
      name: "Salman Ahmed",
      relation: "Groom's Father",
      phone: "+92 321 4567890",
    },
  ],
  closingMessage: {
    duaArabic: "بَارَكَ اللَّهُ لَكَ وَبَارَكَ عَلَيْكَ وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ",
    quote: "“May Allah bless you, shower His blessings upon you, and unite you both in goodness and peace.”",
    note: "Your presence and prayers are the greatest gift to our families as Ayla & Zayan embark on this blessed journey together.",
  },
};
