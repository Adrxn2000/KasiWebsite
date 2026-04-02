# Kasi Essentials 🧢

A full-featured streetwear e-commerce platform built to showcase and sell authentic South African Kasi fashion brands. Built with React, this project demonstrates a complete shopping experience from browsing to checkout.

---

## 🔗 Live Demo

https://kasi-essentials.netlify.app/

---

## 📸 Preview

> Homepage · Shop · Product Detail · Cart · Checkout · Admin Dashboard

---

## 🛠️ Built With

- **React 19** — UI framework
- **React Router DOM** — Client-side routing
- **Tailwind CSS 4** — Utility-first styling
- **Lucide React** — Icon library
- **Vite** — Build tool and dev server
- **localStorage** — Client-side auth and data persistence (pre-backend)

---

## ✨ Features

### Storefront
- 🏠 **Homepage** — Bold hero section, featured brands, animated product cards, scrolling marquee
- 🛍️ **Shop Page** — Product grid with category filtering, search, and sort
- 🔍 **Product Detail Page** — Full product view, quantity selector, related products
- ❤️ **Wishlist** — Save and manage favourite items across the site
- 🛒 **Cart** — Add, remove, update quantities with live total
- 💳 **Checkout** — Order summary and simulated payment flow

### Auth
- 🔐 **Login & Register** — localStorage-based authentication with session persistence
- 👤 **Protected Routes** — Admin-only pages guarded by role check
- 🧠 **Remember Me** — Saves credentials for returning users

### Admin Dashboard
- 📊 **Stats Overview** — Total products, inventory value, low stock alerts
- ➕ **Add Products** — Inline modal to add new items to the store
- ✏️ **Edit Products** — Update product details, price, stock
- 🗑️ **Delete Products** — Confirmation dialog before removal
- 📦 **Inventory Tracking** — Color-coded stock status (low/out)

### Design
- ⚡ **Brutalist Streetwear Aesthetic** — Black, orange, Impact typography
- 📱 **Fully Responsive** — Mobile-first layout with slide-out nav
- 🎞️ **Scroll Animations** — Intersection Observer powered entrance effects
- 🌀 **Animated Product Cards** — Hover reveal add-to-cart
- 📜 **Marquee Banner** — Scrolling brand ticker on homepage

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm

### Installation

```bash
# Clone the repo
git clone https://github.com/Adrxn2000/KasiWebsite.git

# Navigate to the project
cd KasiWebsite/kasi-essentials

# Install dependencies
npm install

# Start dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

---

## 🔑 Demo Credentials

| Role  | Email                        | Password   |
|-------|------------------------------|------------|
| Admin | admin@blackfabrics.com       | admin123   |
| User  | Register a new account       | —          |

---

## 📁 Project Structure

```
kasi-essentials/
├── public/
│   └── images/          # Product images
├── src/
│   ├── assets/          # Fonts and static assets
│   ├── components/      # All React components
│   │   ├── Header.jsx
│   │   ├── HomePage.jsx
│   │   ├── ShopPage.jsx
│   │   ├── ProductCard.jsx
│   │   ├── ProductDetailPage.jsx
│   │   ├── CartPage.jsx
│   │   ├── CheckoutPage.jsx
│   │   ├── WishlistPage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── RegisterPage.jsx
│   │   ├── AboutPage.jsx
│   │   ├── ContactPage.jsx
│   │   ├── AdminDashboard.jsx
│   │   └── ProtectedRoute.jsx
│   ├── context/
│   │   └── AuthContext.jsx  # Auth state and session management
│   ├── App.jsx              # Routes, global state, mock API
│   ├── main.jsx
│   └── index.css
├── package.json
└── vite.config.js
```

---

## 🗺️ Roadmap

The current version uses mock data and localStorage for a fully functional frontend demo. The next phase will connect a real backend:

- [ ] **Supabase** — PostgreSQL database + real authentication
- [ ] **Real Product Management** — Products stored in DB, not localStorage
- [ ] **PayFast / Yoco** — Live ZAR payment processing
- [ ] **Order Management** — Real order tracking in admin dashboard
- [ ] **Email Notifications** — Order confirmation emails
- [ ] **Image Uploads** — Admin can upload product photos directly

---

## 👨‍💻 Developer

**Adrian Majavu**
- GitHub: [@Adrxn2000](https://github.com/Adrxn2000)
- Portfolio: [adrian3dportfolio.netlify.app](https://adrian3dportfolio.netlify.app)

---

## 📄 License

This project is for portfolio and demonstration purposes.

---

> *Kasi Made. Kasi Proud.* 🇿🇦
