let mongoose = require("mongoose");

let Schema = mongoose.Schema;

let MonthSchema = new Schema({
  month: {
      type: String,
      required: true
    },
  year: {
    type: String,
    required: true
    },
    
  monthAsNumber: {
    type: Number,
    required: true
      },
});

// This creates our model from the above schema, using mongoose's model method
let MonthData = mongoose.model("Month", MonthSchema);

module.exports = MonthData;