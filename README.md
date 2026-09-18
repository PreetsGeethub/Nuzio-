# Nuzio — Personalized News Brief

A full-stack personalized news briefing application built as a hiring assignment for Olinp Technology.

Nuzio guides users through a short onboarding flow to understand their preferences and then provides a personalized news briefing experience.

---

## 🚀 Live Demo

**Frontend:** Coming soon

**Backend API:** Coming soonn

---

## ✨ Features

### Authentication
- User registration
- User login
- JWT-based authentication
- HTTP-only authentication cookies
- Protected API routes
- Authenticated user profile endpoint

### Personalized Onboarding

Users can configure:

- Language
- Location preference
- Profession
- News interests / niches
- Preferred voice
- Brief length
- Delivery time
- Notification preference

### News Experience

- Personalized interest categories
- Morning briefing interface
- Story cards
- Category filtering
- Audio-player style experience
- Simulated audio playback
- Animated waveform
- Story navigation
- Playback speed control
- Save story interaction
- Bottom navigation

### Responsive UI

- Mobile-first design
- Responsive layouts
- Dark premium interface
- Designed to closely follow the provided reference design

---

## 🛠️ Tech Stack

### Frontend

- React
- Vite
- Tailwind CSS
- React Router
- Lucide React

### Backend

- Node.js
- Express.js
- JWT
- bcryptjs
- cookie-parser
- CORS
- dotenv

### Development

- Git
- GitHub
- Vercel
- Render

---

## 📁 Project Structure

```text
nuzio/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   └── preferencesController.js
│   │   │
│   │   ├── data/
│   │   │   └── users.js
│   │   │
│   │   ├── middleware/
│   │   │   └── authMiddleware.js
│   │   │
│   │   ├── routes/
│   │   │   ├── authRoutes.js
│   │   │   └── preferencesRoutes.js
│   │   │
│   │   └── server.js
│   │
│   ├── .env
│   └── package.json
│
└── README.md
