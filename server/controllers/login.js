const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

module.exports = {
  register: (req, res) => {
    const { username, email, password } = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    User.create({
      username,
      email,
      password: hash
    })
      .then(user => {
        res.status(201).json({
          msg: "success"
          // user
        });
      })
      .catch(err => res.status(500).json({ msg: err.message }));
  },

  login: (req, res) => {
    const { email, password } = req.body;
    User.findOne({ email: email })
      .then(user => {
        let isTrue = bcrypt.compareSync(password, user.password);
        if (isTrue) {
          let token = jwt.sign(
            { id: user._id, username: user.username },
            process.env.JWT_SECRET_KEY
          );
          res.status(201).json({
            msg: "success to login",
            token,
            username: user.username,
            id: user._id
          });
        } else {
          res.status(400).json({
            mgs: "check email or password"
          });
        }
      })
      .catch(err => {
        res.status(400).json({
          msg: "user not found"
        });
      });
  }
};
