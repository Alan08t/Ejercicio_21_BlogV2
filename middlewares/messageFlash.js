function messageFlash(req, res, next) {
  res.locals.message = req.flash("message");

  return next();
}

module.exports = messageFlash;
