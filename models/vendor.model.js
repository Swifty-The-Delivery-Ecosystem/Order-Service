const { model, Schema } = require("mongoose");

const vendorSchema = new Schema(
  {
    ownerName: {
      type: String,
      required: true,
      trim: true,
    },
    restaurantName: {
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
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: Number,
      required: true, // Index according to the list [Mess, GH, Acad, Delta]
    },
    supported_location: [Number],
    isActive: {
      type: Boolean,
      default: true,
    },
    status: {
      type: String,
      enum: ["active", "in process", "debarred", "closed"],
      default: "in process",
    },
    ratings: {
      type: Number,
    },
    number_of_rating: {
      type: Number,
    },
    description: {
      type: String,
    },
    delivery_partners: [
      {
        type: Schema.Types.ObjectId,
        ref: "DeliveryPartner",
      },
    ],
    images: [String],
    tags: [String],
  },
  { timestamps: true }
);

module.exports = model("Vendor", vendorSchema);
