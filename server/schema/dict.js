var mongoose = require("mongoose");
const { Schema } = mongoose;

const EntrySchema = new Schema({
  key: String, // String is shorthand for {type: String}
  entries: [{ word: String, number: Number, head: Boolean, spam: Boolean }],
});

module.exports = mongoose.model("EntrySchema", EntrySchema);
