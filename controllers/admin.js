const User = require("../models/user");
const Role = require("../models/role");

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
      res.json({
        roles: roles,
      });
    })
    .catch((err) => console.log(err));
};

// exports.getAddProduct = (req, res, next) => {
//   res.render("admin/edit-product", {
//     pageTitle: "Add Product",
//     path: "/admin/edit-product",
//     editing: false,
//   });
// };

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
    accessType: "user",
  });
  user
    .save()
    .then((result) => {
      res.json({
        message: "Created User",
      });
    })
    .catch((err) => console.log(err));
};

exports.createRole = (req, res, next) => {
  console.log("creating role");
  const name = req.body.name;
  const role = new Role({
    name: name,
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
  console.log(userId);
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
  console.log("deleting user");
  const userId = req.params.userId;
  User.findByIdAndRemove(userId)
    .then((result) => {
      console.log("Destroyed user");
      res.json({
        message: "deleted user",
      });
    })
    .catch((err) => console.log(err));
};
exports.deleteRole = (req, res, next) => {
  console.log("deleting role");
  const roleId = req.params.roleId;
  Role.findByIdAndRemove(roleId)
    .then((result) => {
      console.log("Destroyed role");
      res.json({
        message: "deleted role",
      });
    })
    .catch((err) => console.log(err));
};
