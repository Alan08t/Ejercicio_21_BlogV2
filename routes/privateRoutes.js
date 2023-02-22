const express = require("express");
const router = express.Router();
const panelController = require("../controllers/panelController");

// Rutas relacionadas al panel de control (Admin):
// ...
router.get("/", panelController.index);

module.exports = router;
