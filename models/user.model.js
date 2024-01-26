const { model, Schema } = require("mongoose");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      immutable: true,
    },
    phone: {
      type: Number,
      required: true,
      unique: true,
    },
    favourite_vendors: {
      type: [String],
    },
    primary_location: {
      type: Number,
      required: true,
    },
    is_veg: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

module.exports = model("User", userSchema);
