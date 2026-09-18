const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const preferencesRoutes = require("./routes/preferencesRoutes");
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
// Auth routes
app.use("/api/auth", authRoutes);
app.use("/api/preferences", preferencesRoutes);
// Health check
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Nuzio API is running 🚀",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Nuzio API running on port ${PORT}`);
});