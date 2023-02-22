const session = require("express-session");
const passport = require("passport");
const { User } = require("../models");
const LocalStrategy = require("passport-local");
const bcrypt = require("bcryptjs");
flash = require("express-flash");

module.exports = (app) => {
  app.use(
    session({
      secret: process.env.SECRET,
      resave: false, //  Docs: "The default value is true, but using the default has been deprecated".
      saveUninitialized: true, // Docs: "The default value is true, but using the default has been deprecated".
    }),
  );

  app.use(flash());

  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      async (username, password, cb) => {
        try {
          const user = await User.findOne({ where: { email: username } });

          if (!user) {
            console.log("Las credenciales no son correctas..");
            return cb(null, false, { message: "Credenciales incorrectas." });
          }
          const match = await bcrypt.compare(password, user.password);
          if (!match) {
            console.log("Las credenciales no son correctas..");
            return cb(null, false, { message: "Credenciales incorrectas." });
          }
          console.log("Credenciales verificadas correctamente");
          return cb(null, user);
        } catch (error) {
          cb(error);
        }
      },
    ),
  );

  app.use(passport.session());

  passport.serializeUser((user, cb) => {
    cb(null, user.id);
  });
  passport.deserializeUser(async (id, cb) => {
    try {
      const user = await User.findByPk(id);
      cb(null, user); // Usuario queda disponible en req.user.
    } catch (err) {
      cb(err);
    }
  });
};
