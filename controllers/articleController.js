const { format, formatDistance } = require("date-fns");
const { Article, Comment, User } = require("../models");
const formidable = require("formidable");

// Display the specified resource.
async function show(req, res) {
  const articleId = req.params.id;
  const article = await Article.findOne({
    where: { id: articleId },
    include: [{ model: Comment }, { model: User }],
  });

  const comments = await Comment.findAll({
    where: { articleId: articleId },
    include: [{ model: User }],
    order: [["createdAt", "DESC"]],
  });
  res.render("article", { article, comments, format, formatDistance, page_name: "article" });
}

// Show the form for creating a new resource
async function create(req, res) {
  console.log("article create");
  res.render("articles/create", { page_name: "createArticle" });
}

// Store a newly created resource in storage.
async function store(req, res) {
  const form = formidable({
    multiples: false,
    uploadDir: __dirname + "/../public/img/articles",
    keepExtensions: true,
  });
  form.parse(req, async (err, fields, files) => {
    const { title, content } = fields;

    const article = await Article.create({
      userId: req.user.id,
      title: title,
      content: content,
      image: files.image.newFilename,
      createdAt: Date.now(),
    });

    article.save();

    req.flash("message", "Article Added Successfully");
    res.redirect("/usuarios/" + req.user.id);
  });
}

// Show the form for editing the specified resource.
async function edit(req, res) {
  const articleId = req.params.id;
  const article = await Article.findOne({
    where: { id: articleId },
  });
  res.render("articles/edit", { article });
}

// Update the specified resource in storage.
async function update(req, res) {
  const form = formidable({
    multiples: false,
    uploadDir: __dirname + "/../public/img",
    keepExtensions: true,
  });

  form.parse(req, async (err, fields, files) => {
    const { title, content } = fields;

    const articleId = req.params.id;

    await Article.update(
      { title: title, content: content, image: files.image.newFilename },
      {
        where: {
          id: articleId,
        },
      },
    );
  });
  req.flash("message", "Article Updated Successfully");
  res.redirect("/usuarios/" + req.user.id);
}

// Remove the specified resource from storage.
async function destroy(req, res) {
  const articleId = req.params.id;
  await Article.destroy({
    where: {
      id: articleId,
    },
    force: true,
  });
  req.flash("message", "Article Deleted Successfully");
  res.redirect("/usuarios/" + req.user.id);
}
// Otros handlers...
// ...

module.exports = {
  show,
  create,
  store,
  edit,
  update,
  destroy,
};
