const path = require("path");

const express = require("express");

// const shopController = require("../controllers/shop");

const router = express.Router();

router.get("/", (req, res, next) => {
  res.redirect("/admin/users");
});

module.exports = router;
