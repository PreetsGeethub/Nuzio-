const express = require("express");

const {
  getPreferences,
  savePreferences,
} = require("../controllers/preferencesController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", authMiddleware, getPreferences);
router.post("/", authMiddleware, savePreferences);

module.exports = router;