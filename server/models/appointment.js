const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    pet: { type: mongoose.Schema.Types.ObjectId, ref: "Pet", required: true },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }, // pet owner
    vet: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // assigned vet
    appt_date: { type: Date, required: true },
    appt_time: { type: String, required: true },
    reason: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Appointment", appointmentSchema);
