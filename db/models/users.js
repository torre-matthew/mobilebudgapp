let mongoose = require("mongoose");

let Schema = mongoose.Schema;

let UsersSchema = new Schema({
  firstName: {
      type: String,
      required: false
  },
  lastName: {
    type: String,
    required: false
    },
  email: {
      type: String,
      required: true
  },
  profilePic: {
      type: String,
      required: false
  },
});

// This creates our model from the above schema, using mongoose's model method
let UsersData = mongoose.model("Users", UsersSchema);

module.exports = UsersData;