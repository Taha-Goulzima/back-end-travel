const mongoose = require("mongoose");

function connection() {
  mongoose
    .connect(process.env.dbURL)
    .then(() => console.log("Connected to MongoDB"))
    .catch((e) => console.log("Error connecting to MongoDB" + e));
}

module.exports = connection;
