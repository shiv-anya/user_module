const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const sessionSchema = new Schema({
  user: {
    type: Object,
    required: true,
  },
});

module.exports = mongoose.model("Session", sessionSchema);
