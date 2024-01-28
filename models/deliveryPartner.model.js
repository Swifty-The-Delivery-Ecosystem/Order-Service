const { model, Schema } = require("mongoose");

const deliveryPartnerSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    otp: {
      code: {
        type: Number,
      }
    },
    vendor_id: {
      type: Schema.Types.ObjectId,
      ref: 'Vendor',
      required: true
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const DeliveryPartner = model("DeliveryPartner", deliveryPartnerSchema);

module.exports = DeliveryPartner;
