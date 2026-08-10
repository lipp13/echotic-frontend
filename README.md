# 🎟️ EchoTic Frontend (`echotic-fe`)

Frontend Web Application untuk platform tiket konser **EchoTic**, dibangun menggunakan **Next.js (App Router)**, **React 19**, **Tailwind CSS v4**, **Framer Motion**, dan **Three.js / React Three Fiber**.

---

## 🛠️ Tech Stack & Library UI

- **Framework**: Next.js (App Router) v16.2.11
- **Language**: JavaScript (JSX / ES2022+)
- **UI & Animation**: React 19, Framer Motion v12
- **Styling**: Tailwind CSS v4 (Industrial Neon & Cyberpunk Dark Aesthetic, Glassmorphism, Smooth Scroll)
- **3D Graphics**: Three.js, `@react-three/fiber`, `@react-three/drei`
- **Icons**: Lucide React

---

## 📂 Struktur Folder (`echotic-fe`)

```
echotic-fe/
├── app/
│   ├── about/
│   │   ├── layout.js            # SEO Metadata & OpenGraph Config untuk route /about
│   │   └── page.js              # Halaman About Imersif (Hero 3D, Pillars, Tech Stack, Creators)
│   ├── checkout/page.js         # Wizard 3-Step Pembelian & Gateway Bayar
│   ├── dashboard/page.js        # User Profile & Gate Pass Vault
│   ├── events/
│   │   ├── [id]/page.js         # Detail Konser, Denah Seats, & Pilih Tiket
│   │   └── page.js              # Katalog Feed Konser, Search & Multi-Filter
│   ├── login/page.js            # Halaman Autentikasi Sign In
│   ├── register/page.js         # Halaman Pendaftaran Akun
│   ├── ticket/[id]/page.js      # Digital E-Ticket Pass (QR Code & Hologram)
│   ├── globals.css              # Custom Utility & Theme Token Tailwind + Smooth Scroll
│   ├── layout.js                # Root Layout + Provider Context
│   └── page.js                  # Landing Page Imersif (Hero 3D, Countdown)
├── components/
│   ├── sections/                # Component Layout Halaman
│   │   ├── FAQAccordion.jsx     # Accordion FAQ Pertanyaan Tiket & Platform
│   │   ├── Footer.jsx           # Footbar majalah konser (Link /about & Developer credits)
│   │   ├── Hero3D.jsx           # Tiket Hologram 3D Interaktif (Canvas Three.js + ErrorBoundary)
│   │   ├── Navbar.jsx           # Header Navigasi responsif (Auth-Aware)
│   │   └── SeatMap.jsx          # Visual Interactive Seat Selection Grid
│   └── ui/                      # Reusable UI Primitives
│       ├── About3D.jsx          # Multi-model 3D Canvas Switcher (Mic, Speaker, Pass, Vinyl)
│       ├── Button.jsx           # Multi-variant Cyber Button
│       ├── Card.jsx             # Event Card dengan hover glow
│       ├── Countdown.jsx        # Real-time scanline timer
│       ├── Decor3D.jsx          # Icon 3D WebGL mengapung + ErrorBoundary
│       ├── Marquee.jsx          # Banner teks berjalan tak hingga
│       ├── Modal.jsx            # Animated Modal Overlay
│       ├── NoiseFilter.jsx      # SVG Overlay Texture Grain
│       └── Toast.jsx            # Toast Notification System
├── data/
│   └── mockData.js              # Reference fallback data
├── lib/
│   ├── api.js                   # Client Centralized API Service (JWT Token Auto Injection)
│   └── utils.js                 # Helpers (formatPrice IDR, formatDate, classnames)
├── public/                      # Static asset gambar & icon SVG
├── next.config.mjs              # Next Config dengan API Proxy Rewrite ke Port 5000
├── package.json                 # Dependensi Frontend
└── .gitignore                   # Rule Git ignore untuk frontend Next.js
```

---

## ✨ Fitur & Keunggulan Frontend

1. **Interactive 3D Engine & ErrorBoundary (`About3D.jsx`, `Hero3D.jsx`)**:
   - Menghadirkan model WebGL 3D interaktif yang dapat diputar 360° menggunakan `OrbitControls`.
   - Fitur switcher model (Stage Mic, Cyber Speaker, VIP Pass, Neon Vinyl).
   - Dilengkapi `CanvasErrorBoundary` dan fallback animasi otomatis untuk keamanan rendering perangkat GPU.

2. **Halaman About & Vision (`/about`)**:
   - Menyajikan narasi platform ("MUSIC BECOMES MEMORY"), kartu pilar utama, breakdown Tech Stack, FAQ Accordion, serta profil tim pengembang (**Alif Alfathar** & **Farras Khairy**).

3. **Global Smooth Scrolling**:
   - Konfigurasi `scroll-behavior: smooth` dan styling scrollbar neon pada `app/globals.css`.

4. **Integrated API Layer (`lib/api.js`)**:
   - Terhubung secara seamless dengan backend Express (`http://localhost:5000/api`).
   - Menyimpan JWT Access Token & Refresh Token di Local Storage secara aman.

5. **Visual Interactive Seat Map (`SeatMap.jsx`)**:
   - Memvisualisasikan peta tempat duduk berdasarkan seksi dan baris.
   - Terhubung secara real-time ke database backend untuk memblokir kursi yang sudah terpesan.

---

## ⚡ Cara Menjalankan Frontend

### 1. Install Dependensi
```bash
cd echotic-fe
npm install
```

### 2. Jalankan Server Development Next.js
```bash
npm run dev
```

Aplikasi web akan dapat diakses di **`http://localhost:3000`**.
