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

const {
  createComment,
  getComment,
  deleteComment
} = require("../controllers/comment");
const isLogin = require("../helpers/isLogin");

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Express" });
});

router
  .get("/showArticle", showArticle)
  .get("/getComment/:articleId", getComment)
  .get("/showOneArticle/:id", showOneArticle)
  .get("/showOwnArticle", isLogin, showOwnArticle)
  .post("/createArticle", createArticle)
  .post("/createComment/:articleId", createComment)
  .put("/editArticle/:id", editArticle)
  .delete("/deleteArticle/:id", deleteArticle)
  .delete("/deleteComment/:id", deleteComment);

// .post("/login", login)

module.exports = router;
