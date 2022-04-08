const mongoose = require('mongoose')

const MONGODB_URI =
  process.env.MONGODB_URI || 'mongodb://localhost/expense_tracker'

mongoose.connect(MONGODB_URI)
// useNewUrlParser, useUnifiedTopology, useFindAndModify, and useCreateIndex are no longer supported options from Mongoose 6.x updates


const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error');
})

db.once('open', () => {
  console.log('mongoDB is working')
})

module.exports = db
