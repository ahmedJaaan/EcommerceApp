const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema;

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      minlength: [2, "To short"],
      maxlength: [40, "To long"],
    },
    slug: {
      type: String,
      unique: true,
      index: true,
      lowercase: true,
    },
    user: {
      type: ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", categorySchema);
