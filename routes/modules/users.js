const express = require('express')
const router = express.Router()
const passport = require('passport')
const bcrypt = require('bcryptjs')
const User = require('../../models/user')

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login',
  })
)

router.get('/register', (req, res) => {
  const { name, email } = ''
  const errors = []
  res.render('register', { errors, name, email })
})

router.post('/register', async (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  const errors = []

  if (!name || !email || !password || !confirmPassword) {
    errors.push({ message: '所有欄位皆為必填' })
  }
  if (password !== confirmPassword) {
    errors.push({ message: '密碼與確認密碼不符，請再重新輸入' })
  }
  if (errors.length) {
    return res.render('register', {
      errors,
      name,
      email,
      password,
      confirmPassword,
    })
  }

  User.findOne({ email })
    .then((user) => {
      if (user) {
        errors.push({
          message: '這個Email已經註冊過了。',
        })
        return res.render('register', {
          errors,
          name,
          email,
          password,
          confirmPassword,
        })
      }

      return bcrypt
        .genSalt(10) // 產生「鹽」，並設定複雜度係數為 10
        .then((salt) => bcrypt.hash(password, salt)) // 為使用者密碼「加鹽」，產生雜湊值
        .then((hash) =>
          User.create({
            name,
            email,
            password: hash, // 用雜湊值取得原本的使用者密碼
          })
        )
        .then(() => {
        req.flash('success_msg', '註冊成功！請登入帳號開始使用')
        res.redirect('/users/login')
    })
  })
    .catch((err) => console.log(err))
})

router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', '您已經成功登出！')
  res.redirect('/users/login')
})

module.exports = router
