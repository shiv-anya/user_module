const jwt = require("jsonwebtoken");

const Session = require("../models/session");

const isAuth = async (req, res, next) => {
  const session = await Session.find();
  const user = { ...session[0]._doc.session.user };
  const token = user.token;

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, "johndoeasecretchef");
    req.user = user;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  next();
};

module.exports = isAuth;
