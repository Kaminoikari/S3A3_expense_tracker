const express = require('express')
const router = express.Router()
const Detail = require('../../models/detail')

//detail category
const category = require('../../config/category.json').category

//util
const timeFormat = require('../../util/timeFormat')

router.get('/new', (req, res) => {
  const config = {
    title: '新增支出',
    action: '/details',
  };
  res.render('new', { config, category });
});

router.post('/', (req, res) => {
  const userId = req.user._id;
  const { name, category, date, amount, merchant } = req.body;
  //缺欄位
  if (!name || !category || !date || !amount || !merchant) {
    req.flash('warning_msg', '所有欄位皆為必填');
    return res.redirect('/details/new');
  }
  Detail.create({
    ...req.body,
    userId,
  })
    .then(() => res.redirect('/'))
    .catch((err) => console.log(err));
});

router.get('/:id/edit', (req, res) => {
  const userId = req.user._id;
  const detail_id = req.params.id;
  const config = {
    title: '修改支出',
    action: `/details/${detail_id}?_method=PUT`,
  };
  Detail.findOne({ _id: detail_id, userId })
    .lean()
    .then((detail) => {
      detail.date = timeFormat(detail.date);
      return res.render('edit', { config, category, detail });
    })
    .catch((err) => console.log(err));
});

router.put('/:id', (req, res) => {
  const userId = req.user._id;
  const detail_id = req.params.id;
  const { name, category, date, amount, merchant } = req.body;

  Detail.findOne({ _id: detail_id, userId })
    .then((detail) => {
      detail.name = name;
      detail.category = category;
      detail.date = date;
      detail.amount = amount;
      detail.merchant = merchant;
      return detail.save();
    })
    .then(() => res.redirect('/'))
    .catch((err) => console.log(err));
});

router.delete('/:id', (req, res) => {
  const userId = req.user._id;
  const detail_id = req.params.id;
  Detail.findOne({ _id: detail_id, userId })
    .then((detail) => {
      detail.remove();
      return res.redirect('/');
    })
    .catch((err) => console.log(err));
});

module.exports = router