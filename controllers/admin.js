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

exports.getSingleRole = (req, res, next) => {
  Role.find({ _id: req.params.roleId })
    .exec()
    .then((result) => {
      if (result.length < 1) {
        return res.status(400).json({
          message: "Role not Found",
        });
      }
      return res.status(200).json({
        role: result[0],
      });
    })
    .catch((err) => console.log(err));
};

exports.createUser = async (req, res, next) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const password = req.body.password;
  const role = req.body.role;
  const accessType = req.body.accessType;
  const userIsThere = await User.findOne({ email: email });
  if (!userIsThere) {
    const user = new User({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      role: role,
      accessType: accessType,
    });
    if (role !== "") {
      const roleFound = await Role.find({ name: role });
      const updatedMembers = [...roleFound[0].members.users];
      updatedMembers.push(user);
      roleFound[0].members.users = [...updatedMembers];
      roleFound[0].members.quantity++;
      roleFound[0].save();
    }
    user
      .save()
      .then((result) => {
        res.redirect("/admin/users");
      })
      .catch((err) => console.log(err));
  } else {
    res.json({
      message: "user already present",
    });
  }
};

exports.createRole = async (req, res, next) => {
  console.log("creating role");
  const name = req.body.name;
  const member = req.body.member;
  let quantity;
  let newMember;
  console.log(member);
  if (Object.keys(member).length === 0) {
    quantity = 0;
    newMember = [];
  } else {
    quantity = 1;
    newMember = [member];
  }
  if (newMember.length !== 0) {
    const user = await User.findOne({ _id: member._id });
    user.role = name;
    user.save();
  }
  const role = new Role({
    name: name,
    members: {
      users: newMember,
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

exports.updateUser = (req, res, next) => {
  const userId = req.params.userId;
  const updatedFirstName = req.body.firstName;
  const updatedLastName = req.body.lastName;
  const updatedEmail = req.body.email;
  const updatedPassword = req.body.password;
  const updatedRole = req.body.role;
  const updatedAccessType = req.body.accessType;
  User.findById(userId)
    .then(async (user) => {
      const roleToDelete = await Role.findOne({ name: user.role });
      if (roleToDelete) {
        const updatedMembers = roleToDelete.members.users.filter(
          (user) => user._id !== userId
        );
        roleToDelete.members.users = [...updatedMembers];
        roleToDelete.members.quantity--;
        roleToDelete.save();
      }
      user.firstName = updatedFirstName;
      user.lastName = updatedLastName;
      user.email = updatedEmail;
      user.password = updatedPassword;
      user.role = updatedRole;
      user.accessType = updatedAccessType;
      user.save();
      const roleToUpdate = await Role.findOne({ name: updatedRole });
      roleToUpdate.members.users.push(user);
      roleToUpdate.members.quantity++;
      roleToUpdate.save();
    })
    .then(async (user) => {
      console.log("Updated product ");
      res.json({
        message: "updated user",
        user: user,
      });
    })
    .catch((err) => console.log(err));
};

exports.addUserToRole = async (req, res, next) => {
  const roleId = req.params.roleId;
  const updatedName = req.body.name;
  const newMember = req.body.member;
  const role = await Role.findOne({ _id: roleId });
  let updatedMembers = [...role.members.users];
  let updatedQuantity;
  if (updatedMembers.length !== 0 && newMember !== undefined) {
    const memberIndex = updatedMembers.findIndex(
      (user) => user._id.toString() === newMember._id.toString()
    );
    if (memberIndex >= 0) return;
  }
  if (newMember !== undefined && Object.keys(newMember) !== 0) {
    updatedMembers.push(newMember);
    let i = 0;
    while (i < updatedMembers.length) {
      const user = await User.findOne({ _id: updatedMembers[i]._id });
      user.role = updatedName;
      user.save();
      i++;
    }
    updatedQuantity = role.members.quantity + 1;
    role.members.users = updatedMembers;
    role.members.quantity = updatedQuantity;
  }
  role.name = updatedName;
  role.save().then(() => {
    res.json({
      message: "Updated user in roles",
    });
  });
};

exports.deleteUser = async (req, res, next) => {
  const userId = req.params.userId;
  const user = await User.findOne({ _id: userId });
  const roleName = user.role;
  if (roleName !== "") {
    const role = await Role.findOne({ name: roleName });
    const newMembers = role.members.users.filter(
      (user) => user._id.toString() !== userId.toString()
    );
    role.members.users = newMembers;
    role.members.quantity--;
    role.save();
  }
  User.remove({ _id: userId })
    .exec()
    .then((result) => {
      res
        .status(200)
        .json({ message: "User Deleted" })
        .redirect("/admin/users");
    })
    .catch((err) => console.log(err));
};
exports.deleteRole = async (req, res, next) => {
  console.log("deleting role");
  const roleId = req.params.roleId;
  const role = await Role.findOne({ _id: roleId });
  const updatedMembers = role.members.users.map((user) => user._id);
  let i = 0;
  while (i < updatedMembers.length) {
    const user = await User.findOne({ _id: updatedMembers[i] });
    user.role = "";
    user.save();
    i++;
  }
  Role.findByIdAndRemove(roleId)
    .then((result) => {
      res.status(200).json({ message: "Role Deleted" });
    })
    .catch((err) => console.log(err));
};

exports.deleteUserFromRole = async (req, res, next) => {
  console.log("deleting user from role");
  const userId = req.params.userId;
  const roleId = req.params.roleId;
  const role = await Role.findOne({ _id: roleId });
  const updatedMembers = role.members.users.filter(
    (user) => user._id.toString() !== userId.toString()
  );
  const updatedQuantity = role.members.quantity - 1;
  role.members.users = updatedMembers;
  role.members.quantity = updatedQuantity;
  role.save();
  const user = await User.findOne({ _id: userId });
  user.role = "";
  user.save().then(() => {
    res.json({
      message: "user deleted from role",
    });
  });
};
