const jwt = require("jsonwebtoken");
const User = require("../models/user");

var isLogin = (req, res, next) => {
  let token = req.headers.token;
  let decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
  if (token) {
    User.findOne({ _id: decode.id })
      .then(data => {
        if (data) {
          next();
        } else {
          

          res.status(400).json({
            message: "User is invalid"
          });
        }
      })
      
      .catch(err => {
        res.status(400).json({
          message: "User must be Logged In"
        });
      });

  } else {
    res.status(400).json({
      message: "User must be Logged In"
    });
  }
};

module.exports = isLogin;
