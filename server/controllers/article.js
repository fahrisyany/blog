const mongoose = require("mongoose");
const Article = require("../models/article");
let jwt = require("jsonwebtoken");

module.exports = {
  createArticle: function(req, res) {
    let token = req.headers.token;
    let decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const { authorName, articleTitle, articleBody, articleTag } = req.body;
    
    Article.create({
      authorName: authorName,
      author: decode.id,
      articleTitle: articleTitle,
      articleBody: articleBody,
      articleTag: articleTag
    })
      .then(article => {
        res.status(200).json({
          msg: "Adding article",
          article
        });
      })
      .catch(err => {
        res.status(500).json({
          msg: err.message
        });
      });
  },

  showArticle(req, res) {
    Article.find()
      .then(article => {
        res.status(200).json({ msg: "all Articles found ", article });
      })
      .catch(err => {
        res.status(500).json({ msg: "err", err });
      });
  },
  showOwnArticle(req, res) {
    let token = req.headers.token;
    let decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
    Article.find({author:decode.id})
      .then(article => {
        res.status(200).json({ msg: "my Articles found ", article });
      })
      .catch(err => {
        res.status(500).json({ msg: "err", err });
      });
  },
  showOneArticle(req, res) {
    Article.find({_id:req.params.id})
      .then(article => {
        res.status(200).json({ msg: "one Articles found ", article });
      })
      .catch(err => {
        res.status(500).json({ msg: "err", err });
      });
  },
  editArticle(req, res) {
    const { articleTitle, articleBody,
      //  articleTag 
      } = req.body;
    Article.update(
      { _id: req.params.id },
      {
        $set: {
          articleTitle,
          articleBody,
          // articleTag
        }
      }
    )
      .then(article => {
        res
          .status(200)
          .json({ msg: `Article id = ${req.params.id} edited`, article });
      })
      .catch(err => {
        res.status(500).json({ msg: "err", err });
      });
  },

  deleteArticle(req, res) {
    let objectId = mongoose.Types.ObjectId;
    Article.deleteOne({ _id: objectId(req.params.id) })
      .then(article => {
        res
          .status(200)
          .json({ msg: `Article id = ${objectId(req.params.id)} deleted` });
      })
      .catch(err => {
        res.status(500).json({ msg: "err", err });
      });
  }
};
