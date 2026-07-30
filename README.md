# 🎟️ EchoTic Frontend (`echotic-fe`)

Frontend Web Application untuk platform tiket konser **EchoTic**, dibangun menggunakan **Next.js (App Router)**, **React 19**, **Tailwind CSS v4**, **Framer Motion**, dan **Three.js / React Three Fiber**.

---

## 🛠️ Tech Stack & Library UI

- **Framework**: Next.js (App Router) v16.2.11
- **Language**: JavaScript (JSX / ES2022+)
- **UI & Animation**: React 19, Framer Motion v12
- **Styling**: Tailwind CSS v4 (Industrial Neon & Cyberpunk Dark Aesthetic)
- **3D Graphics**: Three.js, `@react-three/fiber`, `@react-three/drei`
- **Icons**: Lucide React

---

## 📂 Struktur Folder (`echotic-fe`)

```
echotic-fe/
├── app/
│   ├── checkout/page.js         # Wizard 3-Step Pembelian & Gateway Bayar
│   ├── dashboard/page.js        # User Profile & Gate Pass Vault
│   ├── events/
│   │   ├── [id]/page.js         # Detail Konser, Denah Seats, & Pilih Tiket
│   │   └── page.js              # Katalog Feed Konser, Search & Multi-Filter
│   ├── login/page.js            # Halaman Autentikasi Sign In
│   ├── register/page.js         # Halaman Pendaftaran Akun
│   ├── ticket/[id]/page.js      # Digital E-Ticket Pass (QR Code & Hologram)
│   ├── globals.css              # Custom Utility & Theme Token Tailwind
│   ├── layout.js                # Root Layout + Provider Context
│   └── page.js                  # Landing Page Imersif (Hero 3D, Countdown)
├── components/
│   ├── sections/                # Component Layout Halaman
│   │   ├── Footer.jsx           # Footbar majalah konser
│   │   ├── Hero3D.jsx           # Tiket Hologram 3D Interaktif (Canvas Three.js)
│   │   ├── Navbar.jsx           # Header Navigasi responsif (Auth-Aware)
│   │   └── SeatMap.jsx          # Visual Interactive Seat Selection Grid
│   └── ui/                      # Reusable UI Primitives
│       ├── Button.jsx           # Multi-variant Cyber Button
│       ├── Card.jsx             # Event Card dengan hover glow
│       ├── Countdown.jsx        # Real-time scanline timer
│       ├── Decor3D.jsx          # Icon 3D mengapung
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

1. **Integrated API Layer (`lib/api.js`)**:
   - Terhubung secara seamless dengan backend Express (`http://localhost:5000/api`).
   - Menyimpan JWT Access Token & Refresh Token di Local Storage secara aman.
   - Otomatis melakukan **Silent Token Refresh** apabila token expired saat mengakses API.

2. **Visual Interactive Seat Map (`SeatMap.jsx`)**:
   - Memvisualisasikan peta tempat duduk berdasarkan seksi dan baris.
   - Terhubung secara real-time ke database backend untuk memblokir kursi yang sudah terpesan.

3. **Digital Pass Hologram (`ticket/[id]/page.js`)**:
   - E-Ticket unik yang menyajikan barcode simulasi dan QR Code gate admission pass.
   - Efek 3D Tilt Card saat kursor mendekati tiket pass.

4. **Rich Aesthetic Design**:
   - Skema warna Cyberpunk Neon (Acid Green `#ccff00`, Hot Pink `#ff0055`, Cyber Cyan `#00f0ff`, Background `#07070a`).
   - Monospace Typography (Geist Mono) untuk nuansa terminal konser eksklusif.

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

> **Catatan Proxy**: `next.config.mjs` telah mengonfigurasi rewrite otomatis sehingga semua request ke `/api/*` pada frontend akan langsung diteruskan ke Backend Express di `http://localhost:5000/api/*`. Pastikan Backend Server sudah berjalan terlebih dahulu.
