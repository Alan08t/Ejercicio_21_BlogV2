function isAuthenticatedWritter(req, res, next) {
  if (req.user && req.user !== undefined && req.user.roleId >= 2) {
    next();
  } else {
    res.redirect("/acceso-denegado");
  }
}

module.exports = isAuthenticatedWritter;
