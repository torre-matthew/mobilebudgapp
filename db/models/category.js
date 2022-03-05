let mongoose = require("mongoose");

let Schema = mongoose.Schema;

let CategorySchema = new Schema({
  categoryName: {
      type: String,
      required: true
    }
});

// This creates our model from the above schema, using mongoose's model method
let CategoryData = mongoose.model("Category", CategorySchema);

module.exports = CategoryData;