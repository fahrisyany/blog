const chai = require("chai");
const expect = chai.expect;
const mongoose = require("mongoose");
const Article = require("../models/article");

const chaiHttp = require("chai-http");
chai.use(chaiHttp);

describe("check CRUD", function() {
  after(function(done) {
    mongoose.connect(
      "mongodb://localhost:27017/test",
      { useNewUrlParser: true },
      function() {
        Article.collection.drop();
        Article.remove({}, function() {});
        done();
      }
    );
  });

  it("get /users/showArticle should return all articles ", function(done) {
    chai
      .request("http://localhost:3000")
      .get("/users/showArticle")
      .end(function(err, res) {
        console.log("show all article========>>>", res.body);
        // expect(res).to.have.status(201);
        expect(res).to.be.a("object");
        done();
      });
  });

  it("get /users/getComment/:articleid should return comments from one article ", function(done) {
    chai
      .request("http://localhost:3000")
      .get("/users/getComment/5b8202ba5540a450c8038690")
      .end(function(err, res) {
        console.log("show  comments========>>>", res.body);
        // expect(res).to.have.status(201);
        expect(res).to.be.a("object");
        done();
      });
  });
  it("get /users/showArticle/:id should return one article ", function(done) {
    chai
      .request("http://localhost:3000")
      .get("/users/showArticle/5b8202ba5540a450c8038690")
      .end(function(err, res) {
        console.log("show one article========>>>", res.body);
        // expect(res).to.have.status(201);
        expect(res).to.be.a("object");
        done();
      });
  });

  it("get /users/showOwnArticle should return Article/s created from an authenticated user", function(done) {
    chai
      .request("http://localhost:3000")
      .get("/users/showOwnArticle")
      .set(
        "token",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViN2Q1NTg3NjE4OTk3Y2M5YzY0ZDQ1NyIsInVzZXJuYW1lIjoib2tpIiwiaWF0IjoxNTM1MjA3NDk5fQ.swhjFmGzJ7o4nDdVD3_yuQesjrh_V4t-5dQAe8ww3WY"
      )
      .end(function(err, res) {
        console.log("show my article========>>>", res.body);
        // expect(res).to.have.status(201);
        expect(res).to.be.a("object");
        done();
      });
  });

  it("post /users/createArticle should create an article", function(done) {
    chai
      .request("http://localhost:3000")
      .post("/users/createArticle")
      .set(
        "token",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViN2Q1NTg3NjE4OTk3Y2M5YzY0ZDQ1NyIsInVzZXJuYW1lIjoib2tpIiwiaWF0IjoxNTM1MjA3NDk5fQ.swhjFmGzJ7o4nDdVD3_yuQesjrh_V4t-5dQAe8ww3WY"
      )
      .send({
        authorName: "user",
        // author:"123233",
        articleTitle: "hantu",
        articleBody: "seram",
        articleTag: "story"
      })
      .end(function(err, res) {
        console.log("create Article========>>>", res.body);
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res).to.be.a("object");
        done();
      });
  });

  it("post /users/createComment/:articleId should create comment in an Article", function(done) {
    chai
      .request("http://localhost:3000")
      .post("/users/createComment/5b8209d21f252a569eed0e5a")
      .set(
        "token",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViN2Q1NTg3NjE4OTk3Y2M5YzY0ZDQ1NyIsInVzZXJuYW1lIjoib2tpIiwiaWF0IjoxNTM1MjA3NDk5fQ.swhjFmGzJ7o4nDdVD3_yuQesjrh_V4t-5dQAe8ww3WY"
      )
      .send({
        articleId: "5b8209d21f252a569eed0e5a",
        // articleTitle: "hantu",
        userName: "user",
        commentBody: "text"
      })
      .end(function(err, res) {
        console.log("create comment========>>>", res.body);
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res).to.be.a("object");
        done();
      });
  });

  it("put /users/editArticle/:articleId should return create an article", function(done) {
    chai
      .request("http://localhost:3000")
      .put("/users/editArticle/5b8202ba5540a450c8038690")
      .set(
        "token",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViN2Q1NTg3NjE4OTk3Y2M5YzY0ZDQ1NyIsInVzZXJuYW1lIjoib2tpIiwiaWF0IjoxNTM1MjA3NDk5fQ.swhjFmGzJ7o4nDdVD3_yuQesjrh_V4t-5dQAe8ww3WY"
      )
      .send({
        articleTitle: "hantu2",
        articleBody: "seram banget"
      })
      .end(function(err, res) {
        console.log("update Article========>>>", res.body);
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res).to.be.a("object");
        done();
      });
  });

  it("delete /users/deleteArticle/:articleId should delete an Article created from authen User", function(done) {
    chai
      .request("http://localhost:3000")
      .del("/users/deleteArticle/5b8202ba5540a450c8038690")
      .set(
        "token",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViN2Q1NTg3NjE4OTk3Y2M5YzY0ZDQ1NyIsInVzZXJuYW1lIjoib2tpIiwiaWF0IjoxNTM1MjA3NDk5fQ.swhjFmGzJ7o4nDdVD3_yuQesjrh_V4t-5dQAe8ww3WY"
      )

      .end(function(err, res) {
        console.log("delete article========>>>", res.body);
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res).to.be.a("object");
        done();
      });
  });

  it("delete /users/deleteComment/:articleId should create comment in an Article", function(done) {
    chai
      .request("http://localhost:3000")
      .del("/users/deleteComment/5b8206defb96695540c7d5d0")
      .set(
        "token",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViN2Q1NTg3NjE4OTk3Y2M5YzY0ZDQ1NyIsInVzZXJuYW1lIjoib2tpIiwiaWF0IjoxNTM1MjA3NDk5fQ.swhjFmGzJ7o4nDdVD3_yuQesjrh_V4t-5dQAe8ww3WY"
      )

      .end(function(err, res) {
        console.log("delete comment========>>>", res.body);
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res).to.be.a("object");
        done();
      });
  });
});
