const chai = require("chai");
const expect = chai.expect;

const chaiHttp = require("chai-http");
chai.use(chaiHttp);



describe("check CRUD", function() {
  // after(function(done) {
  //   mongoose.connect(
  //     "mongodb://localhost:27017/test",
  //     { useNewUrlParser: true },
  //     function() {
  //       User.collection.drop();
  //       // User.remove({}, function() {});
  //       done();
  //     }
  //   );
  // });

  it("post /users/createArticle should return create an article", function(done) {
    chai
      .request("http://localhost:3000")
      .post("/users/createArticle")
      .send({
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

  it("get /users/showArticle should return all articles available", function(done) {
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
});
