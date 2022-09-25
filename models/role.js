const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const roleSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  members: {
    users: [{ type: Object, required: true }],
    quantity: { type: Number, required: true },
  },
});

module.exports = mongoose.model("Role", roleSchema);
