const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const mongoose = require("mongoose");

const app = express();

const adminRoutes = require("./routes/admin");
// const userRoutes = require("./routes/user");
// const errorController = require("./controllers/error");
const User = require("./models/user");

app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  User.findById("6327529f6254e697e3639158")
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

app.use("/admin", adminRoutes);
// app.use(userRoutes);

// app.use(errorController.get404);

mongoose
  .connect(
    "mongodb+srv://sg90883:sg90883@cluster0.rthcyyk.mongodb.net/userModule?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("here");
    app.listen(3000);
  })
  .catch((err) => {
    console.log("here too");
    console.log(err);
  });
