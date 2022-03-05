let mongoose = require("mongoose");

let Schema = mongoose.Schema;

let MonthSchema = new Schema({
  monthAsNumber: {
      type: Number,
      required: true
    },
  year: {
    type: Number,
    required: true
    },
  month: {
    type: String,
    required: true
    },
});

// This creates our model from the above schema, using mongoose's model method
let MonthData = mongoose.model("Month", MonthSchema);

module.exports = MonthData;