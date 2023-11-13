const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const form = new Schema({
  title: String,
  description: String,
  due_date: Date,
  status: String,
  priority: String,
  is_deleted: { type: Boolean, default: false },
});

const forms = mongoose.model("form", form);

module.exports = { forms };
