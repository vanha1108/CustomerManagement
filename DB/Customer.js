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
    birthdate: {
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
        String,
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
    purchase: {
        type: Number,
    }
  },
  { collection: "customer", timestamps: true }
);

module.exports = mongoose.model("Customer", customerschema);
