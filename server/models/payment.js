const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    bill: { type: mongoose.Schema.Types.ObjectId, ref: "Bill", required: true },
    amount: { type: Number, required: true },
    method: { type: String, enum: ["card", "cash", "other"], required: true },
    status: {
      type: String,
      enum: ["pending", "completed"],
      default: "pending",
    },
    paidAt: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Payment", paymentSchema);
