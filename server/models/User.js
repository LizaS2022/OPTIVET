const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 50,
      validate: {
        validator: function (v) {
          return /^[a-zA-Z]+$/.test(v);
        },
      },
    },
    last_name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 50,
      validate: {
        validator: function (v) {
          return /^[a-zA-Z]+$/.test(v);
        },
      },
    },
    email: {
      type: String,
      unique: true,
      match: [/.+@.+\..+/, "Must match an email address!"],
      required: true,
    },
    passwordHash: {
      type: String,
      required: true,
      minlength: 6,
    },
    role: {
      type: String,
      enum: ["owner", "veterinarian", "staff", "admin"],
      required: true,
    },
    phone: { type: String, required: true },
    address: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator: function (v) {
          return v.length >= 5 && v.length <= 100;
        },
      },
    },
  },
  { timestamps: true }
);

//Virtual field for raw password input
userSchema.virtual("password").set(function (password) {
  if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/.test(password)) {
    throw new Error(
      "Password must be at least 6 chars, include upper/lowercase and a digit"
    );
  }
  this.passwordHash = bcrypt.hashSync(password, 10);
});

module.exports = mongoose.model("User", userSchema);
