var express = require("express");
var router = express.Router();
const {
  createArticle,
  showArticle,
  editArticle,
  deleteArticle,
  showOwnArticle,
  showOneArticle
} = require("../controllers/article");

const { createComment, getComment,deleteComment } = require("../controllers/comment");
const isLogin = require("../helpers/isLogin");

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Express" });
});

router
  .get("/showArticle", showArticle)
  .get("/getComment/:articleId", getComment)
  .get("/showOneArticle/:id", showOneArticle)
  .get("/showOwnArticle", showOwnArticle)
  .put("/editArticle/:id", editArticle)
  .post("/createArticle", isLogin, createArticle)
  .post("/createComment/:articleId", createComment)
  .delete("/deleteArticle/:id", deleteArticle)
  .delete("/deleteComment/:id", deleteComment)


// .post("/login", login)

module.exports = router;
