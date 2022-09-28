const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { LocalStorage } = require("node-localstorage");
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
          user.save();
          localStorage.setItem("user", JSON.stringify(user));
          res.status(200).json(user);
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
          res.redirect("/login");
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postLogout = async (req, res, next) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const retrievedUser = await User.findOne({ _id: user._id });
  console.log("retrieved", retrievedUser);
  retrievedUser.token = "";
  retrievedUser.save();
  localStorage.removeItem("user");
  res.json({
    message: "logged out",
  });
};
