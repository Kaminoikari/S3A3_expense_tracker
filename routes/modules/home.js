const express = require('express')
const router = express.Router()

const Record = require('../../models/record')
const Category = require('../../models/category')

//monthList
const monthList = require('../../config/monthList.json').month

//util
const timeFormat = require('../../util/timeFormat')
const getRecordYear = require('../../util/getRecordYear')

router.get('/', async (req, res) => {
  const userId = req.user._id
  const { category, year, month } = req.query
  try {
    //使用 aggregate 不需使用 lean()
    let records = await Record.aggregate([
      {
        $project: {
          id: 1,
          name: 1,
          category: 1,
          date: 1,
          amount: 1,
          merchant: 1,
          year: { $year: '$date' },
          month: { $month: '$date' },
          userId: 1,
        },
      },
      {
        $match: {
          userId,
          category: category || String,
          year: year ? Number(year) : Number,
          month: month ? Number(month) : Number,
        },
      },
      { $sort: { date: -1 } },
    ])
    let categories = await Category.find().lean()
    let yearList = new Set() //存取所有收支紀錄中的年份
 
    records.forEach((record) => {
      //generate yearList 存取所有收支紀錄中的年份
      yearList = getRecordYear(record, yearList)

      //dateFormat => yyyy-mm-dd
      record.date = timeFormat(record.date)

      record.iconName = categories.find(
        (item) => item.name === record.category
      ).className

      
    })

    //計算總金額
    const totalNum = records.reduce(
      (prev, record) => (prev += record.amount), 0)

    const totalAmount = totalNum.toLocaleString()

    return res.render('index', {
      categories,
      categoryValue: category,
      yearValue: year,
      monthValue: month,
      yearList,
      monthList,
      totalAmount,
      records,
    })
  } catch (e) {
    console.error(e)
  }
})

module.exports = router
