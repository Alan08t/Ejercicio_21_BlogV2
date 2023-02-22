function makeUserAvailableInViews(req, res, next) {
  if (req.params.id === req.user.id) {
    next();
  } else {
    redirect("/acceso-denegado");
    console.log("no es el mismo usuario");
  }
}
module.exports = makeUserAvailableInViews;
