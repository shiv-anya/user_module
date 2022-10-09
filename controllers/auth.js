const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Session = require("../models/session");
const { initializeApp } = require("firebase/app");
const {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} = require("firebase/auth");

const firebaseConfig = {
  apiKey: "AIzaSyB-JZj6_7pLPkcQ_FrRJmvLowcMRpCYNsk",
  authDomain: "user-module-26cf3.firebaseapp.com",
  projectId: "user-module-26cf3",
  storageBucket: "user-module-26cf3.appspot.com",
  messagingSenderId: "27477975367",
  appId: "1:27477975367:web:9094363df3b43558ddac62",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const login = (req, res, email, password) => {
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

exports.postLogin = (req, res, next) => {
  const email = req.body.email.toLowerCase();
  const password = req.body.password;
  auth.onAuthStateChanged((user) => {
    if (user) {
      user.reload().then(() => {
        if (!user.emailVerified) {
          console.log("not verified");
          return;
        } else {
          login(req, res, email, password);
        }
      });
    } else {
      login(req, res, email, password);
    }
  });
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
            email: email,
          });
          return user.save();
        })
        .then((result) => {
          createUserWithEmailAndPassword(auth, email, password)
            .then((user) => {
              sendEmailVerification(auth.currentUser).then(() => {
                console.log("sent verification mail");
              });
              res.json({
                message: "Signed up",
              });
            })
            .catch((error) => {
              console.log(error.message);
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
