const mongoose = require("mongoose");
const { Schema } = mongoose;
const { ObjectId } = Schema;
const userSchema = new Schema(
  {
    name: String,
    email: {
      type: String,
      required: true,
      index: true,
      unique: true,
    },
    role: {
      type: String,
      default: "subscriber",
    },
    cart: {
      type: Array,
      default: [],
    },
    address: String,
    wishlist: [
      {
        type: ObjectId,
        ref: "Product",
      },
    ],
    picture: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("User", userSchema);
