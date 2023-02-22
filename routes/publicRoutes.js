const express = require("express");
const router = express.Router();
const pagesController = require("../controllers/pagesController");
const userController = require("../controllers/userController");

router.get("/", pagesController.showHome);

router.get("/contacto", pagesController.showContact);

router.get("/acerca-de-nosotros", pagesController.showAboutUs);

router.get("/logout", userController.logout);

router.get("/acceso-denegado", pagesController.denied);

module.exports = router;
