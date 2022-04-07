const mongoose = require('mongoose')
const Schema = mongoose.Schema

const detailSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  category: {
    type: String,
    require: true,
  },
  date: {
    type: Date,
    require: true,
  },
  amount: {
    type: Number,
    require: true,
  },
  merchant: {
    type: String,
    require: true,
  },
  userId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User',
    index: true,
    require: true,
  },
})

module.exports = mongoose.model('Detail', detailSchema)
