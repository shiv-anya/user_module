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

// roleSchema.methods.addToMembers = (name, member) => {
//   if (this.members.users.length !== 0) {
//     const memberIndex = this.members.users.findIndex((user) => {
//       return user._id.toString() === member._id.toString();
//     });
//   }
//   const updatedMembers = { ...this.members.users };
//   if (memberIndex >= 0) {
//     return;
//   } else {
//     updatedMembers.users.push({
//       member,
//     });
//     this.members.quantity++;
//   }
//   this.members = updatedMembers;
//   return this.save();
// };

module.exports = mongoose.model("Role", roleSchema);
