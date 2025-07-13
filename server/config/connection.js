const mongoose = require("mongoose");

//Generate , the name of the DB at the end of the URI is wht creates the database in
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost:27017/optivet_db"
);

module.exports = mongoose.connection;
