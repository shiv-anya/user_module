const path = require("path");

const express = require("express");

const adminController = require("../controllers/admin");

const router = express.Router();

router.get("/users", adminController.readUsers);

router.post("/add-user", adminController.createUser);

router.patch("/edit-user/:userId", adminController.updateUser);

router.delete("/delete-user/:userId", adminController.deleteUser);

router.get("/users/:userId", adminController.getSingleUser);

router.get("/roles", adminController.readRoles);

router.post("/add-role", adminController.createRole);

router.patch("/edit-role/:roleId", adminController.updateRole);

router.delete("/delete-role/:roleId", adminController.deleteRole);

module.exports = router;
