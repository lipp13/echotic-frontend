export const genres = [
  { id: "all", name: "All Genres" },
  { id: "edm", name: "EDM / Electronic" },
  { id: "pop", name: "Pop / Indie" },
  { id: "rock", name: "Rock / Metal" },
  
];

export const venues = {
  jiexpo: {
    id: "jiexpo",
    name: "JIExpo Kemayoran Hall D2",
    city: "Jakarta",
    address: "Jl. Haji Benyamin Sueb, Kemayoran, Jakarta Pusat 10620",
    mapUrl:
      "https://maps.google.com/maps?q=JIExpo%20Kemayoran&t=&z=13&ie=UTF8&iwloc=&output=embed",
    capacity: 8000,
  },
  tennis_indoor: {
    id: "tennis_indoor",
    name: "Tennis Indoor Senayan",
    city: "Jakarta",
    address: "Jl. Pintu Satu Senayan, Gelora, Jakarta Pusat 10270",
    mapUrl:
      "https://maps.google.com/maps?q=Tennis%20Indoor%20Senayan&t=&z=13&ie=UTF8&iwloc=&output=embed",
    capacity: 4000,
  },
  jiexpo_theatre: {
    id: "jiexpo_theatre",
    name: "JIExpo Theatre",
    city: "Jakarta",
    address: "Pusat Niaga Building, JIExpo, Kemayoran, Jakarta 10620",
    mapUrl:
      "https://maps.google.com/maps?q=JIExpo%20Theatre&t=&z=13&ie=UTF8&iwloc=&output=embed",
    capacity: 2500,
  },
  stadiun_siliwangi: {
    id: "stadiun_siliwangi",
    name: "Stadion Siliwangi",
    city: "Bandung",
    address: "Jl. Lombok No.10, Merdeka, Sumur Bandung, Bandung 40113",
    mapUrl:
      "https://maps.google.com/maps?q=Stadion%20Siliwangi%20Bandung&t=&z=13&ie=UTF8&iwloc=&output=embed",
    capacity: 15000,
  },
  gambir_expo: {
    id: "gambir_expo",
    name: "Gambir Expo Center",
    city: "Jakarta",
    address: "Jl. Medan Merdeka Timur No.17, Gambir, Jakarta Pusat 10110",
    mapUrl:
      "https://maps.google.com/maps?q=Gambir%20Expo%20Center&t=&z=13&ie=UTF8&iwloc=&output=embed",
    capacity: 12000,
  },
};

export const artists = {
  steve_alesso: {
    id: "steve_alesso",
    name: "STEVE AOKI & ALESSO",
    bio: "Global electronic music heavyweights joining forces for an unforgettable neon-drenched night of heavy drops, high-energy stage presence, and massive light shows.",
    image:
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=600&auto=format&fit=crop",
  },
  sigit_barasuara: {
    id: "sigit_barasuara",
    name: "THE SIGIT & BARASUARA",
    bio: "Indonesia's premier rock exponents. The Sigit's raw garage retro-rock meets Barasuara's poetic, multi-layered indie rock firestorm. Expect massive guitar riffs and raw kinetic energy.",
    image:
      "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?q=80&w=600&auto=format&fit=crop",
  },
  laufey_maliq: {
    id: "laufey_maliq",
    name: "LAUFEY & MALIQ & D'ESSENTIALS",
    bio: "A night of romantic modern jazz, classic standards, and soulful Indonesian pop rhythms. Laufey's enchanting orchestral jazz-pop combined with the legendary groove of Maliq & D'Essentials.",
    image:
      "https://images.unsplash.com/photo-1511192336575-5a79af67a629?q=80&w=600&auto=format&fit=crop",
  },
  burgerkill_deadsquad: {
    id: "burgerkill_deadsquad",
    name: "BURGERKILL & DEADSQUAD",
    bio: "The absolute titans of Indonesian metal. Burgerkill's crushing metalcore meets Deadsquad's hyper-technical death metal. Prepare for the most ferocious moshpit of the year.",
    image:
      "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=600&auto=format&fit=crop",
  },
};

export const events = [
  {
    id: "evt-hindia-2026",
    title: "HINDIA",
    genre: "pop",
    subtitle: "Hindia Live in Jakarta 2026",
    date: "2026-08-15",
    time: "20:00 WIB",
    venueId: "tennis_indoor",
    artistId: "hindia",
    image:
      "https://imgs.search.brave.com/-pj1O5fzIwZhT2xKpQThXJGwln1zvI1uRXHNg70w0ag/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9kZXdh/dGlrZXQuaWQvYmxv/Zy93cC1jb250ZW50/L3VwbG9hZHMvMjAy/NC8wMS9KYWR3YWwt/S29uc2VyLUhpbmRp/YS0xMDY4eDY3NS5q/cGc",
    featured: true,
    trending: true,
    description:
      "Experience an emotional night with Hindia as he performs songs from his acclaimed albums alongside fan-favorite singles. Featuring immersive visuals, live band arrangements, and an intimate concert atmosphere for Indonesian music lovers.",
    ticketCategories: [
      {
        id: "vip",
        name: "VIP Experience",
        price: 1800000,
        capacity: 250,
        sold: 238,
      },
      {
        id: "festival",
        name: "Festival Standing",
        price: 950000,
        capacity: 1800,
        sold: 1635,
      },
      {
        id: "tribune",
        name: "Tribune",
        price: 650000,
        capacity: 1400,
        sold: 1084,
      },
    ],
    seatingConfig: {
      hasSeatedMap: true,
      sections: [
        {
          id: "VIP",
          name: "VIP Front Row",
          price: 1800000,
          rows: ["A", "B"],
          seatsPerRow: 15,
        },
        {
          id: "TRIBUNE-A",
          name: "Tribune A",
          price: 650000,
          rows: ["C", "D", "E"],
          seatsPerRow: 24,
        },
        {
          id: "TRIBUNE-B",
          name: "Tribune B",
          price: 650000,
          rows: ["F", "G", "H"],
          seatsPerRow: 24,
        },
      ],
    },
  },
  {
    id: "evt-pestapora-2026",
    title: "PESTAPORA 2026",
    genre: "pop",
    subtitle: "Indonesia's Biggest Music Festival",
    date: "2026-09-25",
    time: "15:00 WIB",
    venueId: "gambir_expo",
    artistId: "pestapora",
    image:
      "https://imgs.search.brave.com/aN7C80ScFpJC1S1PHVlkqwurS8SPfnRTu4-XCG7mFxc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jbG91/ZC5qcG5uLmNvbS9w/aG90by9hcnNpcC93/YXRlcm1hcmsvMjAy/Ni8wMS8wMS9zdWFz/YW5hLWZlc3RpdmFs/LW11c2lrLXBlc3Rh/cG9yYS0yMDI1LWRp/LWdhbWJpci1leHBv/LWtlbWF5b3ItdGdp/ci5qcGc",
    featured: true,
    trending: true,
    description:
      "A three-day celebration featuring Indonesia's biggest musicians across multiple stages, bringing together pop, rock, indie, hip-hop, and alternative music fans.",
    ticketCategories: [
      {
        id: "daily",
        name: "Daily Pass",
        price: 450000,
        capacity: 8000,
        sold: 6920,
      },
      {
        id: "three",
        name: "3-Day Pass",
        price: 1100000,
        capacity: 5000,
        sold: 4880,
      },
      {
        id: "vip",
        name: "VIP Festival Pass",
        price: 2200000,
        capacity: 1000,
        sold: 905,
      },
    ],
    seatingConfig: {
      hasSeatedMap: false,
      sections: [],
    },
  },
  {
    id: "evt-reality-club-2026",
    title: "REALITY CLUB",
    genre: "pop",
    subtitle: "Reality Club Live in Jakarta 2026",
    date: "2026-08-30",
    time: "19:30 WIB",
    venueId: "tennis_indoor",
    artistId: "reality_club",
    image:
      "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?q=80&w=1200&auto=format&fit=crop",
    featured: true,
    trending: true,
    description:
      "Reality Club returns to Jakarta with a spectacular live performance featuring their biggest hits, immersive visuals, and an unforgettable indie-pop concert experience.",
    ticketCategories: [
      {
        id: "vip",
        name: "VIP Experience",
        price: 1650000,
        capacity: 200,
        sold: 183,
      },
      {
        id: "festival",
        name: "Festival Standing",
        price: 850000,
        capacity: 1700,
        sold: 1425,
      },
      {
        id: "tribune",
        name: "Tribune",
        price: 550000,
        capacity: 1200,
        sold: 912,
      },
    ],
    seatingConfig: {
      hasSeatedMap: true,
      sections: [
        {
          id: "VIP",
          name: "VIP Front Row",
          price: 1650000,
          rows: ["A", "B"],
          seatsPerRow: 15,
        },
        {
          id: "TRIBUNE-A",
          name: "Tribune A",
          price: 550000,
          rows: ["C", "D", "E"],
          seatsPerRow: 24,
        },
        {
          id: "TRIBUNE-B",
          name: "Tribune B",
          price: 550000,
          rows: ["F", "G", "H"],
          seatsPerRow: 24,
        },
      ],
    },
  },
  {
    id: "evt-bernadya-2026",
    title: "BERNADYA",
    genre: "pop",
    subtitle: "Bernadya Live in Jakarta 2026",
    date: "2026-09-12",
    time: "19:30 WIB",
    venueId: "jiexpo_theatre",
    artistId: "bernadya",
    image:
      "https://imgs.search.brave.com/MyFbpi6hsLdwibrpfbBsWwHsD-whzTFRid2HNpvn_Zw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9kZXdh/dGlrZXQuaWQvYmxv/Zy93cC1jb250ZW50/L3VwbG9hZHMvMjAy/NC8xMC9KYWR3YWwt/S29uc2VyLUJlcm5h/ZHlhLTEwNjh4NjAx/LmpwZw",
    featured: true,
    trending: true,
    description:
      "An intimate evening with Bernadya performing her chart-topping songs accompanied by a live orchestra and immersive visual production.",
    ticketCategories: [
      {
        id: "vip",
        name: "VIP Experience",
        price: 1500000,
        capacity: 180,
        sold: 170,
      },
      {
        id: "gold",
        name: "Gold Seat",
        price: 850000,
        capacity: 700,
        sold: 628,
      },
      {
        id: "silver",
        name: "Silver Seat",
        price: 550000,
        capacity: 1000,
        sold: 730,
      },
    ],
    seatingConfig: {
      hasSeatedMap: true,
      sections: [
        {
          id: "VIP",
          name: "VIP",
          price: 1500000,
          rows: ["A", "B"],
          seatsPerRow: 14,
        },
        {
          id: "GOLD",
          name: "Gold",
          price: 850000,
          rows: ["C", "D", "E"],
          seatsPerRow: 20,
        },
        {
          id: "SILVER",
          name: "Silver",
          price: 550000,
          rows: ["F", "G", "H"],
          seatsPerRow: 24,
        },
      ],
    },
  },
  {
    id: "evt-tulus-2026",
    title: "TULUS",
    genre: "pop",
    subtitle: "Tulus Live in Jakarta",
    date: "2026-09-26",
    time: "20:00 WIB",
    venueId: "jiexpo",
    artistId: "tulus",
    image:
      "https://imgs.search.brave.com/yiNxPP8t-uSnjwGjkWZ1cjHFMwbgAD8myVbP-g2s01Y/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnNj/ZG4uY28vaW1hZ2Uv/NmU2ZDRjMzMzYzYx/OTgxYzBlNGEyNmRj/MjRhMzNiYTJlY2M1/NjA2ZA",
    featured: true,
    trending: true,
    description:
      "Celebrate an unforgettable night with Tulus performing his greatest hits supported by a full orchestra and stunning stage production.",
    ticketCategories: [
      {
        id: "diamond",
        name: "Diamond VIP",
        price: 2200000,
        capacity: 250,
        sold: 236,
      },
      {
        id: "festival",
        name: "Festival",
        price: 1200000,
        capacity: 2500,
        sold: 2142,
      },
      {
        id: "tribune",
        name: "Tribune",
        price: 750000,
        capacity: 2200,
        sold: 1651,
      },
    ],
    seatingConfig: {
      hasSeatedMap: true,
      sections: [
        {
          id: "VIP",
          name: "Diamond",
          price: 2200000,
          rows: ["A", "B"],
          seatsPerRow: 18,
        },
        {
          id: "TRIBUNE",
          name: "Tribune",
          price: 750000,
          rows: ["C", "D", "E", "F"],
          seatsPerRow: 28,
        },
      ],
    },
  },
  {
    id: "evt-pamungkas-2026",
    title: "PAMUNGKAS",
    genre: "pop",
    subtitle: "Pamungkas Live Tour 2026",
    date: "2026-10-10",
    time: "20:00 WIB",
    venueId: "tennis_indoor",
    artistId: "pamungkas",
    image:
      "https://imgs.search.brave.com/X_Vcq6haFpKuiMwc5ORUukrYb0XKhAPeeAJpM6BJ6Pc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9yZXNv/dXJjZXMudGlkYWwu/Y29tL2ltYWdlcy81/MzczZDg5Yy8wNWU3/LzQ1NTkvYjM0OS8w/ZGM4OWI2YjgxMjAv/MzIweDMyMC5qcGc",
    featured: false,
    trending: true,
    description:
      "Pamungkas returns with an emotional concert featuring fan favorites, cinematic visuals, and an intimate atmosphere.",
    ticketCategories: [
      {
        id: "vip",
        name: "VIP",
        price: 1700000,
        capacity: 200,
        sold: 194,
      },
      {
        id: "festival",
        name: "Festival",
        price: 900000,
        capacity: 1800,
        sold: 1602,
      },
      {
        id: "tribune",
        name: "Tribune",
        price: 600000,
        capacity: 1500,
        sold: 1138,
      },
    ],
    seatingConfig: {
      hasSeatedMap: true,
      sections: [
        {
          id: "VIP",
          name: "VIP",
          price: 1700000,
          rows: ["A", "B"],
          seatsPerRow: 15,
        },
        {
          id: "TRIBUNE",
          name: "Tribune",
          price: 600000,
          rows: ["C", "D", "E"],
          seatsPerRow: 24,
        },
      ],
    },
  },
  {
    id: "evt-juicy-luicy-2026",
    title: "JUICY LUICY",
    genre: "pop",
    subtitle: "Juicy Luicy Live in Jakarta",
    date: "2026-10-24",
    time: "19:30 WIB",
    venueId: "jiexpo_theatre",
    artistId: "juicy_luicy",
    image:
      "https://imgs.search.brave.com/YOc2mj7X0KdfXNEgdPjmviUyfVB2N4HCPKRFnS8uA64/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9kZXdh/dGlrZXQuaWQvYmxv/Zy93cC1jb250ZW50/L3VwbG9hZHMvMjAy/My8xMi9KYWR3YWwt/S29uc2VyLUp1aWN5/LUx1aWN5LTEwNjh4/NzE0LmpwZw",
    featured: false,
    trending: true,
    description:
      "Sing along to Juicy Luicy's biggest hits in a heartfelt evening filled with memorable performances and beautiful stage visuals.",
    ticketCategories: [
      {
        id: "vip",
        name: "VIP",
        price: 1450000,
        capacity: 160,
        sold: 149,
      },
      {
        id: "gold",
        name: "Gold",
        price: 800000,
        capacity: 850,
        sold: 704,
      },
      {
        id: "silver",
        name: "Silver",
        price: 500000,
        capacity: 1000,
        sold: 726,
      },
    ],
    seatingConfig: {
      hasSeatedMap: true,
      sections: [
        {
          id: "VIP",
          name: "VIP",
          price: 1450000,
          rows: ["A", "B"],
          seatsPerRow: 12,
        },
        {
          id: "GOLD",
          name: "Gold",
          price: 800000,
          rows: ["C", "D", "E"],
          seatsPerRow: 20,
        },
      ],
    },
  },
  {
    id: "evt-feast-2026",
    title: ".FEAST",
    genre: "rock",
    subtitle: ".Feast Live in Jakarta",
    date: "2026-11-07",
    time: "20:00 WIB",
    venueId: "jiexpo",
    artistId: "feast",
    image:
      "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?q=80&w=1200&auto=format&fit=crop",
    featured: true,
    trending: true,
    description:
      "A powerful rock performance by .Feast featuring politically charged anthems, explosive visuals, and massive sing-along moments.",
    ticketCategories: [
      {
        id: "vip",
        name: "VIP Pit",
        price: 1800000,
        capacity: 250,
        sold: 245,
      },
      {
        id: "festival",
        name: "Festival",
        price: 850000,
        capacity: 3000,
        sold: 2655,
      },
      {
        id: "tribune",
        name: "Tribune",
        price: 550000,
        capacity: 1800,
        sold: 1347,
      },
    ],
    seatingConfig: {
      hasSeatedMap: false,
      sections: [],
    },
  },
  {
    id: "evt-dj-aloy-2026",
    title: "DJ ALOY",
    genre: "edm",
    subtitle: "Neon Pulse Night 2026",
    date: "2026-12-05",
    time: "21:00 WIB",
    venueId: "jiexpo",
    artistId: "dj_aloy",
    image:
      "https://imgs.search.brave.com/tlRsErM6EpEz3hLESPuPB6PLVzdN-xwDe-hMsY9nU2Q/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9waWN0/dXJlLmRlbnMudHYv/d3AvaW1nL2RlbnNs/aWZlX3YxLzEyODB4/NzIwL3RodW1ibmFp/bC8xNzUyMjA5MDYy/X2RlbnNsaWZlX3Yx/LmpwZw",
    featured: true,
    trending: true,
    description:
      "Get ready for an electrifying night with DJ Aloy as he brings high-energy EDM, Progressive House, Future Bass, and Hard Dance to Jakarta. Experience stunning laser shows, CO₂ cannons, massive LED visuals, and an unforgettable festival atmosphere.",
    ticketCategories: [
      {
        id: "vip",
        name: "VIP Stage Access",
        price: 2200000,
        capacity: 180,
        sold: 166,
      },
      {
        id: "early",
        name: "Early Bird",
        price: 700000,
        capacity: 600,
        sold: 600,
      },
      {
        id: "festival",
        name: "Festival Pass",
        price: 1200000,
        capacity: 2800,
        sold: 2197,
      },
    ],
    seatingConfig: {
      hasSeatedMap: false,
      sections: [],
    },
  },
  {
    id: "evt-sabotage-2026",
    title: "BURGERKILL & DEADSQUAD",
    genre: "rock",
    subtitle: "Sabotage Protocol: Rampage in Bandung",
    date: "2026-10-18",
    time: "17:00 WIB",
    venueId: "stadiun_siliwangi",
    artistId: "burgerkill_deadsquad",
    image:
      "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?q=80&w=1200&auto=format&fit=crop",
    featured: true,
    trending: true,
    description:
      "Get ready to hit the pit. Indonesian heavy metal icons Burgerkill and Deadsquad are taking over Siliwangi Stadium Bandung for a monstrous metal feast. With custom visual staging, pyro shows, and special collaboration sets.",
    ticketCategories: [
      { id: "vip", name: "VIP Metal Pit", price: 1500000, capacity: 300, sold: 280 },
      { id: "fest", name: "Festival Standing", price: 750000, capacity: 5000, sold: 4200 },
      { id: "tribune", name: "Tribune Seated", price: 450000, capacity: 3000, sold: 2100 },
    ],
    seatingConfig: {
      hasSeatedMap: true,
      sections: [
        { id: "VIP", name: "VIP Metal Pit", price: 1500000, rows: ["A", "B"], seatsPerRow: 15 },
        { id: "TRIBUNE", name: "Tribune Seated", price: 450000, rows: ["C", "D", "E"], seatsPerRow: 24 },
      ],
    },
  },
  {
    id: "evt-retrograde-bandung-2026",
    title: "THE SIGIT & BARASUARA",
    genre: "rock",
    subtitle: "Retrograde Eclipse Live in Bandung",
    date: "2026-11-15",
    time: "19:00 WIB",
    venueId: "stadiun_siliwangi",
    artistId: "sigit_barasuara",
    image:
      "https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=1200&auto=format&fit=crop",
    featured: true,
    trending: true,
    description:
      "Two forces of Indonesian rock collide in Bandung! Witness the vintage fuzzy garage tones of The Sigit combined with the polyrhythmic, high-octane indie fire of Barasuara at Stadion Siliwangi Bandung.",
    ticketCategories: [
      { id: "vip", name: "VIP Rock Pit", price: 1250000, capacity: 250, sold: 210 },
      { id: "fest", name: "Festival Standing", price: 650000, capacity: 4000, sold: 3100 },
    ],
    seatingConfig: {
      hasSeatedMap: true,
      sections: [
        { id: "VIP", name: "VIP Rock Pit", price: 1250000, rows: ["A", "B"], seatsPerRow: 15 },
        { id: "TRIBUNE", name: "Tribune", price: 650000, rows: ["C", "D", "E"], seatsPerRow: 24 },
      ],
    },
  },
];

export const testimonials = [
  {
    id: 1,
    name: "Raka Aditya",
    role: "Concert Enthusiast",
    comment:
      "Pertama kali beli tiket konser lewat EchoTic dan pengalaman checkout-nya lancar banget. Tampilan seat selection-nya keren, detail venue jelas, dan proses pembayaran terasa simpel.",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Nadia Putri",
    role: "Music Festival Lover",
    comment:
      "Biasanya beli tiket konser suka ribet karena website lambat, tapi di EchoTic semuanya terasa cepat. Fitur pilih kursi dan preview tiketnya bikin pengalaman beli tiket jadi lebih seru.",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Fajar Ramadhan",
    role: "Indie Music Fan",
    comment:
      "Desain website-nya beda dari platform tiket biasa. Vibes konsernya sudah terasa dari halaman awal, apalagi animasi dan tampilan event detailnya sangat menarik.",
    avatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150&auto=format&fit=crop",
  },
  {
    id: 4,
    name: "Alya Maharani",
    role: "Pop Concert Lover",
    comment:
      "Saya suka banget sama detail informasi konser di EchoTic. Mulai dari kategori tiket, lokasi venue, sampai jumlah tiket tersedia semuanya gampang dipahami.",
    avatar:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=150&auto=format&fit=crop",
  },
  {
    id: 5,
    name: "Dimas Kurniawan",
    role: "Festival Goer",
    comment:
      "Booking tiket konser sekarang jadi lebih nyaman. Tidak cuma jual tiket, EchoTic memberikan pengalaman seperti sedang mempersiapkan datang ke konser langsung.",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop",
  },
];
