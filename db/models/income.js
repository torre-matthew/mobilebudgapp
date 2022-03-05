let mongoose = require("mongoose");

let Schema = mongoose.Schema;

let IncomeSchema = new Schema({
  name: {
      type: String,
      required: true
  },
  date: {
      type: String,
      required: true
  },
  amount: {
      type: String,
      required: true
  },
  afterSpendingAmount: {
    type: String,
    required: false
},
userID: {
    type: String,
    required: true
  },
  monthID: {
    type: String,
    required: true
  }
});

// This creates our model from the above schema, using mongoose's model method
let IncomeData = mongoose.model("Income", IncomeSchema);

module.exports = IncomeData;