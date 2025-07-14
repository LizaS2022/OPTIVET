const mongoose = require("mongoose");

const medicalRecordSchema = new mongoose.Schema(
  {
    pet: { type: mongoose.Schema.Types.ObjectId, ref: "Pet", required: true },
    appointment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment",
      required: true,
    },
    vet: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    diagnosis: String,
    treatment: String,
    notes: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("MedicalRecord", medicalRecordSchema);
