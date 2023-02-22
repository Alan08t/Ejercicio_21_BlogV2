const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
// Rutas relacionadas a los comentarios:
// ...

router.post("/:id/create", ensureAuthenticated, commentController.store);
router.get("/:id/eliminar", ensureAuthenticated, commentController.destroy);

module.exports = router;
