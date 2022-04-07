const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  title: {
    type: String,
    require: true,
  },
  name: {
    type: String,
    require: true,
  },
  className: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model('Category', categorySchema);
