const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const roleSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  members: [
    {
      userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      quantity: { type: Number, required: true },
    },
  ],
});

// userSchema.methods.addToCart = function (product) {
//   const cartItemIndex = this.cart.items.findIndex((p) => {
//     return p.productId.toString() === product._id.toString();
//   });
//   let newQuantity = 1;
//   const updatedCartItems = [...this.cart.items];
//   if (cartItemIndex >= 0) {
//     newQuantity = this.cart.items[cartItemIndex].quantity + 1;
//     updatedCartItems[cartItemIndex].quantity = newQuantity;
//   } else {
//     updatedCartItems.push({
//       productId: product._id,
//       quantity: newQuantity,
//     });
//   }
//   const updatedCart = {
//     items: updatedCartItems,
//   };
//   this.cart = updatedCart;
//   return this.save();
// };

// userSchema.methods.deleteCartItems = function (prodId) {
//   const updatedItems = this.cart.items.filter(
//     (p) => p.productId.toString() !== prodId.toString()
//   );
//   this.cart = updatedItems;
//   return this.save();
// };

// userSchema.methods.clearCart = function () {
//   this.cart = { items: [] };
//   return this.save();
// };

module.exports = mongoose.model("Role", roleSchema);
