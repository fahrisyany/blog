const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const articleSchema = new Schema(
  {
    articleTitle: {
      type: String,
      //   required: [true, "Please input your article title"],
      unique: [true, "title already registered please insert different title"]
    },
    articleBody: {
      type: String,
      required: [true, "Please input your article text"]
    },
    articleTag: {
      type: String,
      required: [true, "Please input your articleTag"]
    },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    authorName: String
  },

  {
    timestamps: true
  }
);

var Article = mongoose.model("Article", articleSchema);
module.exports = Article;
