const chai = require("chai");
const expect = chai.expect;
const mongoose = require("mongoose");
const User = require("../models/user");

const chaiHttp = require("chai-http");
chai.use(chaiHttp);



describe("check registration", function() {
  after(function(done) {
    mongoose.connect(
      "mongodb://localhost:27017/test",
      { useNewUrlParser: true },
      function() {
        User.collection.drop();
        User.remove({}, function() {});
        done();
      }
    );
  });

  it("post /register should return registered user", function(done) {
    chai
      .request("http://localhost:3000")
      .post("/register")
      .send({ username:"user", password: "password", email: "user@gmail.com" })
      .end(function(err, res) {
        console.log("Register========>>>", res.body);
        expect(err).to.be.null;
        expect(res).to.have.status(201);
        expect(res).to.be.a("object");
        done();
      });
  });
  it("post /login should return logged in user", function(done) {
    chai
      .request("http://localhost:3000")
      .post("/login")
      .send({ password: "password", email: "user@gmail.com" })
      .end(function(err, res) {
        expect(err).to.be.null;
        console.log("Login========>>>", res.body);
        expect(res).to.have.status(201);
        expect(res).to.be.a("object");
        done();
      });
  });
});
