# Nuzio — Personalized News Brief

A full-stack personalized news briefing application built as a hiring assignment for **Olinp Technology**.

Nuzio guides users through a short onboarding experience to understand their preferences and then provides a personalized news briefing interface.

---

## 🌐 Live Demo

**Frontend:**  
https://nuzio-zeta.vercel.app/

**Backend API:**  
https://nuzio-production.up.railway.app/

**Health Check:**  
https://nuzio-production.up.railway.app/api/health

---

## 🔐 Demo Credentials

Use the following credentials to access the deployed application:

```text
Email:    aarav@example.com
Password: password123

Note: The current prototype uses in-memory storage, so demo data may reset if the backend service restarts or is redeployed.

✨ Features
Authentication
User registration API
User login
JWT authentication
HTTP-only authentication cookies
Protected API routes
Current-user authentication endpoint
Password hashing using bcrypt
Personalized Onboarding

Users can configure:

Language
Location preference
Profession
News interests / niches
Preferred voice
Brief length
Daily delivery time
Notification preference
News Experience
Personalized interest categories
Morning briefing interface
News story cards
Category filtering
Audio-player style interface
Simulated audio playback
Animated waveform
Story navigation
Playback speed control
Progress interaction
Save story interaction
Bottom navigation
Responsive UI
Mobile-first design
Responsive layout
Dark premium interface
Smooth interactions
UI closely follows the provided product reference
🛠️ Tech Stack
Frontend
React 19
Vite
Tailwind CSS
React Router
Lucide React
Axios
Backend
Node.js
Express.js
JWT
bcryptjs
cookie-parser
CORS
dotenv
Deployment
Vercel — Frontend
Railway — Backend
GitHub — Source Control
🏗️ Architecture
                         ┌──────────────────────┐
                         │        User          │
                         └──────────┬───────────┘
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │  Vercel              │
                         │  React + Vite        │
                         │  Nuzio Frontend      │
                         └──────────┬───────────┘
                                    │
                              REST API
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │  Railway             │
                         │  Node + Express      │
                         │  Nuzio Backend       │
                         └──────────┬───────────┘
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │ In-Memory Storage    │
                         │ Users + Preferences  │
                         └──────────────────────┘
📁 Project Structure
Nuzio-/
│
├── src/
│   ├── components/
│   ├── pages/
│   │   ├── Language.jsx
│   │   ├── Login.jsx
│   │   ├── Profession.jsx
│   │   ├── Interests.jsx
│   │   ├── Preferences.jsx
│   │   ├── Time.jsx
│   │   ├── StayIn.jsx
│   │   ├── Ready.jsx
│   │   └── News.jsx
│   │
│   ├── App.jsx
│   └── main.jsx
│
├── public/
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
│   ├── package.json
│   └── .env
│
├── package.json
├── vite.config.js
├── index.html
├── .gitignore
└── README.md
🔄 Application Flow
Language
   ↓
Login
   ↓
Profession
   ↓
Interests
   ↓
Preferences
   ↓
Delivery Time
   ↓
Notifications
   ↓
Ready
   ↓
News Brief

During onboarding, preferences are temporarily maintained on the client and synchronized with the authenticated backend.

🔐 Authentication Flow

Nuzio uses JWT-based authentication with HTTP-only cookies.

Register
POST /api/auth/register

Example request:

{
  "name": "Aarav",
  "email": "aarav@example.com",
  "password": "password123"
}
Login
POST /api/auth/login

Example:

{
  "email": "aarav@example.com",
  "password": "password123"
}

After successful authentication, the backend stores the JWT in an HTTP-only cookie.

Current User
GET /api/auth/me

Protected endpoint used by the frontend to identify the authenticated user.

📡 API Endpoints
Authentication
Method	Endpoint	Description	Protected
POST	/api/auth/register	Create a new account	No
POST	/api/auth/login	Authenticate a user	No
GET	/api/auth/me	Get current user	Yes
Preferences
Method	Endpoint	Description	Protected
GET	/api/preferences	Get saved preferences	Yes
POST	/api/preferences	Save user preferences	Yes
Health
Method	Endpoint	Description
GET	/api/health	Check backend availability
📋 Preferences Payload

Example:

{
  "language": "English",
  "locationEnabled": false,
  "profession": "Technology",
  "interests": [
    "AI & Technology",
    "Markets",
    "Startups"
  ],
  "voice": "Aria",
  "length": "5 min",
  "deliveryTime": "7:00 AM",
  "notifications": true
}
⚙️ Local Development
1. Clone the repository
git clone https://github.com/PreetsGeethub/Nuzio-.git
cd Nuzio-
2. Install frontend dependencies
npm install
3. Start frontend
npm run dev

Frontend:

http://localhost:5173
4. Install backend dependencies
cd backend
npm install

Create:

backend/.env

Add:

PORT=5000
JWT_SECRET=your_secure_jwt_secret
5. Start backend
npm run dev

Backend:

http://localhost:5000
🔑 Environment Variables
Backend
PORT=5000
JWT_SECRET=your_secure_jwt_secret

The .env file should never be committed to GitHub.

💾 Data Storage

The current assignment prototype uses in-memory storage for users and preferences.

This was intentionally kept lightweight to focus on demonstrating the complete application flow and frontend/backend integration.

Current behavior
Server starts
     ↓
users = []
     ↓
User registers
     ↓
User stored in memory
     ↓
User can login
     ↓
Server restart/redeployment
     ↓
In-memory data resets

For a production version, the same API structure can be connected to a persistent database such as PostgreSQL or MongoDB.

🔒 Security

The backend implements:

Password hashing using bcrypt
JWT authentication
HTTP-only cookies
Protected API routes
CORS configuration
Environment variables for secrets
Passwords excluded from API responses
🎨 Design

The interface follows the provided product reference with emphasis on:

Premium dark UI
Minimal visual language
Green and blue accent gradients
Compact mobile-first layouts
Clear onboarding progression
Personalized briefing experience
Responsive components
📱 Responsive Design

The application follows a mobile-first approach and adapts to larger screens.

Mobile
  ↓
Tablet
  ↓
Desktop
🧪 Testing Flow

To test the complete application:

1. Open the live application
2. Login using the demo credentials
3. Select profession
4. Select interests
5. Configure voice and brief length
6. Select delivery time
7. Configure notifications
8. Review the Ready screen
9. Start listening
10. Explore the News screen
11. Test category filtering
12. Test audio controls
🚀 Deployment
Frontend

The React/Vite application is deployed on Vercel.

https://nuzio-zeta.vercel.app/
Backend

The Node/Express API is deployed on Railway.

https://nuzio-production.up.railway.app/
Production Flow
Browser
   │
   ▼
Vercel
React Application
   │
   │ HTTPS REST API
   ▼
Railway
Express API
   │
   ▼
Authentication + Preferences
🔮 Future Improvements

Possible improvements for a production version include:

Persistent PostgreSQL database
Real news API integration
Server-side news personalization
Real text-to-speech generation
Audio generation and streaming
Browser geolocation integration
Push notifications
Saved stories persistence
User profile management
Refresh-token authentication
Automated unit and integration tests
CI/CD pipeline
👨‍💻 Author

Preetam Kumar

MCA — University of Rajasthan

Built as a full-stack web development hiring assignment.

📄 License

This project was developed for evaluation purposes.


