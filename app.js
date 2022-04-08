const express = require('express')
const session = require('express-session')
const usePassport = require('./config/passport')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const flash = require('connect-flash')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

// mongoDB
const mongoose = require('mongoose')
const routes = require('./routes')
const handlebarsHelpers = require('./util/handlebarsHelpers')
require('./config/mongoose.js')

// app
const app = express()

// PORT
const port = process.env.PORT || 3000

// express template engine
app.engine('.hbs', exphbs.engine({ defaultLayout: 'main', extname: '.hbs', helpers: handlebarsHelpers }))
app.set('view engine', 'hbs')

// setting static files
app.use(express.static('public'))

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
)

// 使用app.use規定每筆請求都需先透過body-parser處理
app.use(bodyParser.urlencoded({ extended: true }))

// 設定每一筆請求都會透過 methodOverride 進行前置處理
app.use(methodOverride('_method'))

// passport
usePassport(app)

// connect-flash
app.use(flash())

app.use((req, res, next) => {
  // 可以在這裡 console.log(req.user) 等資訊來觀察
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  next()
})

// 設定router
app.use(routes)

app.listen(port, () => {
  console.log(`Express Server is Listening on http://localhost:${port}`)
})
