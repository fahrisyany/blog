const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const commentSchema = new Schema(
  {
    commentBody: {
      type: String,
      required: [true, "Please input your comment"]
    },

    userName: String,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    articleId: { type: mongoose.Schema.Types.ObjectId, ref: "Article" }

  },

  {
    timestamps: true
  }
);

var Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;
