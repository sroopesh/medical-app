const express = require("express");
const { createOrUpdateProfile, getProfile } = require("../controllers/profileController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, createOrUpdateProfile);
router.get("/", authMiddleware, getProfile);

module.exports = router;
