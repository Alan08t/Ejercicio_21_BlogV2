const express = require("express");
const router = express.Router();
const articleController = require("../controllers/articleController");
const isAuthenticatedWritter = require("../middlewares/isAuthenticatedWritter");
const isAuthenticatedAdmin = require("../middlewares/isAuthenticatedAdmin");

// Rutas relacionadas a los artículos:
// ...

router.get("/crear", isAuthenticatedWritter, articleController.create);
router.post("/crear", isAuthenticatedWritter, articleController.store);
router.get("/:id/editar", isAuthenticatedWritter, articleController.edit);
router.post("/:id", isAuthenticatedWritter, articleController.update);
router.get("/:id/destroy", isAuthenticatedWritter, articleController.destroy);
router.get("/:id", articleController.show); // mostrar cada articulo por su id en su pagina individual

module.exports = router;
