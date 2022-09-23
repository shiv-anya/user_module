const mongodb = require("mongodb");
const User = require("../models/user");
const Role = require("../models/role");

const ObjectId = new mongodb.ObjectId();

exports.readUsers = (req, res, next) => {
  User.find()
    .then((users) => {
      res.json({
        users: users,
      });
    })
    .catch((err) => console.log(err));
};
exports.readRoles = (req, res, next) => {
  Role.find()
    .then((roles) => {
      res.json(roles);
    })
    .catch((err) => console.log(err));
};

exports.getSingleUser = (req, res, next) => {
  User.find({ _id: req.params.userId })
    .exec()
    .then((result) => {
      if (result.length < 1) {
        return res.status(400).json({
          message: "User not Found",
        });
      }
      return res.status(200).json({
        user: result[0],
      });
    })
    .catch((err) => console.log(err));
};
exports.createUser = (req, res, next) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const password = req.body.password;
  const role = req.body.role;
  const accessType = req.body.accessType;
  const user = new User({
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password,
    role: role,
    accessType: accessType,
  });
  user
    .save()
    .then((result) => {
      res.redirect("/admin/users");
    })
    .catch((err) => console.log(err));
};

exports.createRole = (req, res, next) => {
  console.log("creating role");
  const name = req.body.name;
  const member = req.body.member;
  let quantity;
  console.log(member);
  if (Object.keys(member).length === 0) {
    quantity = 0;
  } else {
    quantity = 1;
  }
  const role = new Role({
    name: name,
    members: {
      users: [member],
      quantity: quantity,
    },
  });
  role
    .save()
    .then((result) => {
      res.json({
        message: "Created Role",
      });
    })
    .catch((err) => console.log(err));
};

// exports.getEditProduct = (req, res, next) => {
//   const editMode = req.query.edit;
//   if (!editMode) {
//     console.log("edit mode not given. Sorry");
//     return res.redirect("/");
//   }
//   const prodId = req.params.productId;
//   Product.findById(prodId)
//     .then((product) => {
//       if (!product) {
//         console.log("no product found, sorry. Redirecting");
//         return res.redirect("/");
//       }
//       res.render("admin/edit-product", {
//         pageTitle: "Edit Product",
//         path: "/admin/edit-product",
//         editing: editMode,
//         product: product,
//       });
//     })
//     .catch((err) => console.log(err));
// };

exports.updateUser = (req, res, next) => {
  const userId = req.params.userId;
  const updatedFirstName = req.body.firstName;
  const updatedLastName = req.body.lastName;
  const updatedEmail = req.body.email;
  const updatedPassword = req.body.password;
  const updatedRole = req.body.role;
  const updatedAccessType = req.body.accessType;
  User.findById(userId)
    .then((user) => {
      user.firstName = updatedFirstName;
      user.lastName = updatedLastName;
      user.email = updatedEmail;
      user.password = updatedPassword;
      user.role = updatedRole;
      user.accessType = updatedAccessType;
      user.save();
    })
    .then((user) => {
      console.log("Updated product ");
      res.json({
        message: "updated user",
        user: user,
      });
    })
    .catch((err) => console.log(err));
};

exports.deleteUser = (req, res, next) => {
  const id = req.params.userId;
  User.remove({ _id: id })
    .exec()
    .then((result) => {
      res
        .status(200)
        .json({ message: "User Deleted" })
        .redirect("/admin/users");
    })
    .catch((err) => console.log(err));
};
exports.deleteRole = (req, res, next) => {
  console.log("deleting role");
  const roleId = req.params.roleId;
  Role.remove({ _id: roleId })
    .exec()
    .then((result) => {
      res
        .status(200)
        .json({ message: "User Deleted" })
        .redirect("/admin/roles");
    })
    .catch((err) => console.log(err));
};
