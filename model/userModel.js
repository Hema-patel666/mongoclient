const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: null
  },
  dob: {
    type: Date,
    default: null
  },
  gender: {
    type: String,
    default: null
  },
  email: {
    type: String,
    unique: true
  },
  password: {
    type: String
  },
  createdAt: {
    type: Date,
    default: null
  },
  updatedAt: {
    type: Date,
    default: null
  },
  token: {
    type: String,
    default: null
  }

});
// const Users=mongoose.model("user", userSchema);
// module.exports=Users
 module.exports = mongoose.model("user", userSchema);