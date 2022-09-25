const path = require("path");

const express = require("express");

const adminController = require("../controllers/admin");

const router = express.Router();

//Users Routes if user is user only
router.get("/users", adminController.readUsers);

router.get("/users/:userId", adminController.getSingleUser);

//Users Routes if user is admin
router.post("/add-user", adminController.createUser);

router.patch("/edit-user/:userId", adminController.updateUser);

router.delete("/delete-user/:userId", adminController.deleteUser);

//Roles routes if user is user only
router.get("/roles", adminController.readRoles);

router.get("/roles/:roleId", adminController.getSingleRole);

//Roles routes for admin
router.post("/add-role", adminController.createRole);

router.delete("/roles/:roleId/:userId", adminController.deleteUserFromRole);

router.patch("/roles/:roleId", adminController.addUserToRole);

router.delete("/delete-role/:roleId", adminController.deleteRole);

module.exports = router;
