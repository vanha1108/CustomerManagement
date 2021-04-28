var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var employeeschema = new Schema(
  {
    code: {
      type: String,
    },
    firstname: {
      type: String,
    },
    lastname: {
      type: String,
    },
    birthday: {
      type: Date,
    },
    sex: {
      type: Boolean,
    },
    address: {
      type: String,
    },
    phone: {
      type: String,
    },
    email: {
      type: String,
    },
    username: {
      type: String,
    },
    password: {
      type: String,
    },
    role: {
      type: Number,
      default: 2,
    },
  },
  { collection: "employee", timestamps: true }
);

module.exports = mongoose.model("Employee", employeeschema);
