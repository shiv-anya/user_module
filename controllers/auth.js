const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { LocalStorage } = require("node-localstorage");
const Session = require("../models/session");
global.localStorage = new LocalStorage("./scratch");

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        return res.redirect("/signup");
      }
      bcrypt
        .compare(password, user.password)
        .then((match) => {
          if (!match) {
            return res.redirect("/login");
          }
          const token = jwt.sign({ email }, "johndoeasecretchef", {
            expiresIn: "2h",
          });
          user.token = token;
          user.save().then((data) => {
            req.session.user = data;
            req.session.save((err) => {
              console.log(err);
              res.json({
                message: "logged in",
                user: user,
              });
            });
          });
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
};

exports.postSignup = (req, res, next) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email: email })
    .then((user) => {
      if (user) {
        return res.redirect("/signup");
      }
      bcrypt
        .hash(password, 12)
        .then((hashedPassword) => {
          const user = new User({
            firstName: firstName,
            lastName: lastName,
            password: hashedPassword,
            email: email.toLowerCase(),
          });
          return user.save();
        })
        .then((result) => {
          res.json({
            message: "signed up",
          });
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postLogout = async (req, res, next) => {
  const user = await User.findOne({ email: req.user.email });
  user.token = "";
  user.save().then(() => {
    req.session.destroy((err) => {
      res.json({
        message: "logged out",
      });
    });
  });
};
