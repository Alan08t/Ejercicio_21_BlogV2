function isAuthenticatedEditor(req, res, next) {
  if (req.user && req.user.roleId >= 3) {
    next();
  } else {
    res.redirect("/acceso-denegado");
    console.log("no es editor");
  }
}

module.exports = isAuthenticatedEditor;
