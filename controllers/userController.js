const { User, Article, Comment, Role } = require("../models");
const passport = require("passport");
const bcrypt = require("bcryptjs");
const { format, formatDistance } = require("date-fns");

// Display a listing of the resource.
async function index(req, res) {
  // inicio de sesion
  res.render("users/login", {
    page_name: "login",
  });
}

function login(req, res) {
  passport.authenticate("local", {
    successRedirect: req.session.redirectTo ? req.session.redirectTo : "/",
    failureRedirect: "/login",
  })(req, res);
}
// Display the specified resource.
async function show(req, res) {
  // pagina del usuario

  console.log("mostrar usuario");

  const userId = req.params.id;
  const user = await User.findOne({
    where: { id: userId },
  });
  const comments = await Comment.findAll({
    where: { userId: userId },
    order: [["createdAt", "DESC"]],
  });
  const articles = await Article.findAll({
    where: { userId: userId },
    order: [["createdAt", "DESC"]],
  });

  if (req.user && req.user.dataValues.id === user.id) {
    return res.render("users/user", {
      page_name: "Perfil de " + user.firstname,
      ...user.dataValues,
      comments,
      articles,
      formatDistance,
      format,
    });
  }

  console.log("no se autentico");
  const userProfile = await User.findOne({
    where: { id: userId },
  });
  console.log("no es autenticado");
  return res.render("users/user", {
    page_name: "Perfil de " + userProfile.firstname,
    avatar: userProfile.avatar,
    username: userProfile.username,
    firstname: userProfile.firstname,
    lastname: userProfile.lastname,
    email: userProfile.email,
    birthdayDate: format(userProfile.birthdayDate, "yyyy-MM-dd"),
    description: userProfile.description,
    roleId: 0,
    formatDistance,
  });
}
// Show the form for creating a new resource
async function register(req, res) {
  // registrar usuario
  res.render("users/register", { page_name: "register" });
}

// Store a newly created resource in storage.
async function store(req, res) {
  if (req.body.password !== req.body.passwordRepeat) {
    console.log("las passwords no coinciden");
  }

  // registrar al usuario - post
  const user = await User.create({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    username: req.body.username,
    password: await bcrypt.hash(req.body.password, 8),
    birthdayDate: req.body.birthdayDate,
    roleId: 1,
  });

  user.save();
  res.redirect("/");
}

function logout(req, res) {
  req.logout(() => {
    res.redirect("/");
  });
}

// Show the form for editing the specified resource.
async function edit(req, res) {
  const userId = req.params.id;
  const user = await User.findOne({
    where: { id: userId },
  });
  res.render("users/edit", { user, page_name: "Editar usuario" });
}

// Update the specified resource in storage.
async function update(req, res) {
  // config del usuario - post
}

// Remove the specified resource from storage.
async function destroy(req, res) {
  const userId = req.params.id;
  await User.destroy({
    where: {
      id: userId,
    },
    force: true,
  });
  req.flash("message", "User Deleted Successfully");
  res.redirect("/panel");
}

// Otros handlers...
// ...

module.exports = {
  index,
  show,
  register,
  store,
  edit,
  update,
  destroy,
  login,
  logout,
};
