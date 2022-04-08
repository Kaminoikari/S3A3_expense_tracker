const express = require('express')
const router = express.Router()
const passport = require('passport')
const bcrypt = require('bcryptjs')
const User = require('../../models/user')

router.get('/login', (req, res) => {
  const email = ''
  const errors = []
  res.render('login', { errors, email })
})

router.post(
  '/login',
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
  let errors = []
  const { name, email, password, confirmPassword } = req.body

  if (!name || !email || !password || !confirmPassword) {
    errors.push({ message: '所有欄位皆為必填' });
  }
  if (password !== confirmPassword) {
    errors.push({ message: '密碼與確認密碼不符，請再重新輸入' });
  }
  if (errors.length) {
    return res.render('register', { ...req.body, errors })
  }

  try {
    let user = await User.findOne({ email })

    if (user) {
      req.flash('warning_msg', '此電子郵件已被註冊')
      return res.render('register', { ...req.body })
    }

    let salt = await bcrypt.genSalt(10);
    let hash = await bcrypt.hash(password, salt)

    //register user
    await User.create({ name, email, password: hash })
    res.redirect('/users/login')
  } catch (e) {
    console.error(e);
  }
})

router.get('/logOut', (req, res) => {
  req.logOut()
  res.redirect('/login')
  return req.flash('success_msg', '您已成功登出')
})

module.exports = router
