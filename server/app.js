const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const cookieParser = require("cookie-parser");

const mongoose = require("mongoose");

const app = express();
const morgan = require("morgan");
const cors = require("cors");
const adminRoutes = require("./routes/admin");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
// const errorController = require("./controllers/error");
const User = require("./models/user");
const store = new MongoDBStore({
  uri: "mongodb+srv://sg90883:sg90883@cluster0.rthcyyk.mongodb.net/userModule?retryWrites=true&w=majority",
  collection: "sessions",
});
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Controll-Allow-Origin", "*");
  res.header(
    "Access-Controll-Allow-Headers",
    "Origin, X-Requested-With, Accept, Authorization, Content-Type"
  );
  if (req.method === "OPTIONS") {
    res.header(
      "Access-Controll-Allow-Methods",
      "PUT, PUSH, PATCH, GET, DELETE"
    );
    res.status(200).json({});
  }
  next();
});
const oneHour = 1000 * 60 * 60;
app.use(cookieParser());
app.use(
  session({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized: false,
    cookie: { maxAge: oneHour },
    resave: true,
    store: store,
  })
);
// app.use((req, res, next) => {
//   User.findById("6327529f6254e697e3639158")
//     .then((user) => {
//       req.user = user;
//       next();
//     })
//     .catch((err) => console.log(err));
// });
app.use(authRoutes);
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
    console.log(err);
  });