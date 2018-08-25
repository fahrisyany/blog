const mongoose = require("mongoose");
const Comment = require("../models/comment");
let jwt = require("jsonwebtoken");
const User = require("../models/user");

module.exports = {
  createComment: function(req, res) {
    let token = req.headers.token;
    let decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const { userName, commentBody } = req.body;

    Comment.create({
      userId: decode.id,
      articleId: req.params.articleId,
      userName: userName,
      commentBody: commentBody
    })
      .then(comment => {
        res.status(200).json({
          msg: "Adding comment success",
          comment
        });
      })
      .catch(err => {
        res.status(500).json({
          msg: err.message
        });
      });
  },
  getComment: function(req, res) {
    Comment.find({ articleId: req.params.articleId })
      .then(article => {
        res.status(200).json({ msg: "one Comment found ", article });
      })
      .catch(err => {
        res.status(500).json({ msg: "err", err });
      });
  },

  deleteComment(req, res) {
    let token = req.headers.token;
    let decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
    Comment.findOne({ userId: decode.id })
      .then((comment) => {
        console.log(`===>`,comment);
        
        Comment.deleteOne({_id:req.params.id})
          .then(() => {
            res
              .status(200)
              .json({ msg: `Comment deleted` });
          })
          .catch(err => {
            res.status(500).json({ msg: err.message });
          });
      })
      .catch(err => {
        res.status(500).json({ msg: "this comment is not yours", err });
      });
  }
};
