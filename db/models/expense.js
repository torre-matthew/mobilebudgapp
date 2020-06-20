let mongoose = require("mongoose");

let Schema = mongoose.Schema;

let ExpenseSchema = new Schema({
nameOfExpense: {
      type: String,
      required: true
  },
dateOfExpense: {
      type: String,
      required: true
  },
amountOfExpense: {
    type: String,
    required: true
},
isPlanned: {
    type: Boolean,
    required: true
},
isPaid: {
  type: Boolean,
  required: true
},
fundingSource: {
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
  },
categoryName: {
    type: String,
    required: false
  },
categoryID: {
  type: String,
  required: false
}
});

// This creates our model from the above schema, using mongoose's model method
let ExpenseData = mongoose.model("Expenses", ExpenseSchema);

module.exports = ExpenseData;