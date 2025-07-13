const mongoose = require("mongoose");

const petSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    species: {
      type: String,
      required: true,
      trim: true,
    },
    breed: {
      type: String,
      required: true,
      trim: true,
    },
    dob: {
      type: Date,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    allergies: [String],
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    vet: { type: mongoose.Schema.Types.ObjectId, ref: "Vet" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Pet", petSchema);
