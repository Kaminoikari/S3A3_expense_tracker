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
  };
  res.render('new', { config, category });
});

router.post('/', (req, res) => {
  const userId = req.user._id;
  const { name, category, date, amount, merchant } = req.body;
  //缺欄位
  if (!name || !category || !date || !amount || !merchant) {
    req.flash('warning_msg', '所有欄位皆為必填');
    return res.redirect('/records/new');
  }
  Record.create({
    ...req.body,
    userId,
  })
    .then(() => res.redirect('/'))
    .catch((err) => console.log(err));
});

router.get('/:id/edit', (req, res) => {
  const userId = req.user._id;
  const record_id = req.params.id;
  const config = {
    title: '修改支出',
    action: `/records/${record_id}?_method=PUT`,
  };
  Record.findOne({ _id: record_id, userId })
    .lean()
    .then((record) => {
      record.date = timeFormat(record.date);
      return res.render('edit', { config, category, record });
    })
    .catch((err) => console.log(err));
});

router.put('/:id', (req, res) => {
  const userId = req.user._id;
  const record_id = req.params.id;
  const { name, category, date, amount, merchant } = req.body;

  Record.findOne({ _id: record_id, userId })
    .then((record) => {
      record.name = name;
      record.category = category;
      record.date = date;
      record.amount = amount;
      record.merchant = merchant;
      return record.save();
    })
    .then(() => res.redirect('/'))
    .catch((err) => console.log(err));
});

router.delete('/:id', (req, res) => {
  const userId = req.user._id;
  const record_id = req.params.id;
  Record.findOne({ _id: record_id, userId })
    .then((record) => {
      record.remove();
      return res.redirect('/');
    })
    .catch((err) => console.log(err));
});

module.exports = router