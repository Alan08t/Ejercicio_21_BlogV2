function isAuthenticatedAdmin(req, res, next) {
  if (req.user && typeof req.user !== undefined && req.user.roleId === 4) {
    next();
  } else {
    res.redirect("/acceso-denegado");
    console.log("no es admin");
  }
}

module.exports = isAuthenticatedAdmin;
