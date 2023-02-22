const { Comment } = require("../models");

// Store a newly created resource in storage.
async function store(req, res) {
  const articleId = req.params.id;
  const { comment } = req.body;
  const data = await Comment.create({
    content: comment,
    userId: req.user.id,
    articleId: articleId,
  });
  data.save();

  req.flash("message", "Comment Added Successfully");
  res.redirect(`/articulos/${articleId}`);
}

// Show the form for editing the specified resource.
async function edit(req, res) {}

// Update the specified resource in storage.
async function update(req, res) {}

// Remove the specified resource from storage.
async function destroy(req, res) {
  const commentId = req.params.id;
  await Comment.destroy({
    where: {
      id: commentId,
    },
    force: true,
  });
  req.flash("message", "Comment Deleted Successfully");
  res.redirect("/usuarios/" + req.user.id);
}
// Otros handlers...
// ...

module.exports = {
  store,
  edit,
  update,
  destroy,
};
