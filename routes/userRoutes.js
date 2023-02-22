const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const isAuthenticatedAdmin = require("../middlewares/isAuthenticatedAdmin");

// Rutas relacionadas a los usuarios:
// ...

router.get("/login", userController.index);
router.post("/login", userController.login);
router.get("/registrar", userController.register);
router.post("/registrar", userController.store);
router.get("/:id", userController.show);

router.get("/:id/editar", isAuthenticatedAdmin, userController.edit);
router.post("/:id/actualizar", isAuthenticatedAdmin, userController.update);
router.get("/:id/eliminar", isAuthenticatedAdmin, userController.destroy);

module.exports = router;
