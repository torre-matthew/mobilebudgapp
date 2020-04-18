let mongoose = require("mongoose");
let Income = require("./income");

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
  income: [{
    type: Schema.Types.ObjectId,
    ref: 'Income'
  }],
  expenses: [{
    type: Schema.Types.ObjectId,
    ref: 'Expenses'
  }],
});

// This creates our model from the above schema, using mongoose's model method
let UsersData = mongoose.model("Users", UsersSchema);

module.exports = UsersData;