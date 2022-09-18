const User = require("../models/User");

exports.getUsers = (req, res, next) => {
  Product.find()
    .then((users) => {
      res.json({
        users: users,
      });
    })
    .catch((err) => console.log(err));
};
