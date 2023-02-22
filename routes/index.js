/**
 * No hay una única forma de organizar las rutas de un sitio web.
 * Una alternativa podría ser organizar las rutas por entidad:
 */

const userRoutes = require("./userRoutes");
const articleRoutes = require("./articleRoutes");
const commentRoutes = require("./commentRoutes");
const apiRoutes = require("./apiRoutes");

/**
 * Otra alternativa podría ser organizar las rutas según su nivel de
 * privacidad (ej: si son rutas públicas o privadas).
 *
 * En `publicRoutes` podrían estar las rutas relacionadas con páginas como
 * Home, Contacto y Sobre Nosotros. En `privateRoutes` podrían estar las rutas
 * relacionados al Panel de Control (Admin). Notar que si se está construyento
 * una API esta alternativa no tendría sentido.
 */

const publicRoutes = require("./publicRoutes");
const privateRoutes = require("./privateRoutes");

// require middlawers
const makeUserAvailableInViews = require("../middlewares/makeUserAvailableInViews");
const messageFlash = require("../middlewares/messageFlash");

// Authentications
const isAuthenticatedAdmin = require("../middlewares/isAuthenticatedAdmin");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

module.exports = (app) => {
  /**
   * Notar que si el sitio está en español, tiene sentido que las URLs que se
   * ven en la barra de direcciiones del navegador también lo estén. No así los
   * nombres de variables, funciones, etc, que siempre se recomienda que estén
   * en inglés.
   */

  app.use(makeUserAvailableInViews);
  app.use(messageFlash);
  app.use("/", publicRoutes);
  app.use("/articulos", articleRoutes);
  app.use("/usuarios", userRoutes);

  app.use(ensureAuthenticated);
  app.use("/comentarios", commentRoutes);
  app.use("/api", apiRoutes);

  app.use(isAuthenticatedAdmin);
  app.use("/panel", privateRoutes);
};
