const { format } = require("date-fns");
const { Article, User } = require("../models");

// Display a panel of the resource.
async function index(req, res) {
  const articles = await Article.findAll();
  const users = await User.findAll();

  res.render("panel/admin", { articles, users, format, page_name: "panel" });
}

module.exports = {
  index,
};
