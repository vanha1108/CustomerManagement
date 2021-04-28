var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var customerschema = new Schema(
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
    totalmoney: {
        type: String,
    },
    visit: {
        type: Number,
    },
    level: {
        type: String,
    },
    purchases: {
        type: Number,
    }
  },
  { collection: "customer", timestamps: true }
);

module.exports = mongoose.model("Customer", customerschema);
