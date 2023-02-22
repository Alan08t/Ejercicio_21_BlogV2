const { faker } = require("@faker-js/faker");
const { Article } = require("../models");
const { format } = require("date-fns");

async function showHome(req, res) {
  const articles = await Article.findAll({
    order: [["updatedAt", "DESC"]],
  });
  res.render("home", { articles, format, faker, page_name: "home" });
}

async function showContact(req, res) {
  res.render("contact", { page_name: "Contacto" });
}

async function showAboutUs(req, res) {
  res.render("aboutUs", { page_name: "Acerca de nosotros" });
}

async function denied(req, res) {
  res.render("deniedView", { page_name: "Acceso denegado" });
}

module.exports = {
  showHome,
  showContact,
  showAboutUs,
  denied,
};
