const express = require('express')
const router = express.Router()
const Record = require('../../models/record')

//record category
const category = require('../../config/category.json').category

//util
const timeFormat = require('../../util/timeFormat')

router.get('/new', (req, res) => {
  const config = {
    title: '新增支出',
    action: '/records',
  }
  return res.render('new', { config, category })
})

router.post('/', (req, res) => {
  const userId = req.user._id;
  const { name, category, date, amount, merchant } = req.body;
  //缺欄位
  if (!name || !category || !date || !amount || !merchant) {
    req.flash('warning_msg', '所有欄位皆為必填')
    return res.redirect('/records/new')
  }
  return Record.create({
    name,
    category,
    date,
    amount,
    merchant,
    userId,
  })
    .then(() => {
      req.flash('success_msg', '建立成功')
      res.redirect('/')
    })
    .catch(err => console.log (err))
})

// 修改頁面
router.get('/:id/edit', (req, res) => {
  const userId = req.user._id;
  const _id = req.params.id;
  const config = {
    title: '修改支出',
    action: `/records/${_id}?_method=PUT`,
  };
  return Record.findOne({ _id, userId })
    .lean()
    .then((record) => {
      record.date = timeFormat(record.date);
      res.render('edit', { config, category, record })
    })
    .catch((err) => console.log(err))
});

// 更新頁面
router.put('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  const { name, category, date, amount, merchant } = req.body

  Record.findOne({ _id, userId })
    .then(record => {
      record = Object.assign(record, { name, category, date, amount, merchant })
      record.save()
    })
    .then (() => {
      req.flash('success_msg', '更新成功')
      res.redirect('/')
    })
    .catch((err) => console.log(err))
})

// 刪除頁面
router.delete('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id

  return Record.findOne({ _id, userId })
    .then(record => record.remove())
    .then(() => {
      req.flash('success_msg', '明細刪除成功')
      res.redirect('/')
    })
    .catch((err) => console.log(err))
})

module.exports = router