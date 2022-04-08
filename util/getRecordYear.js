function getRecordYear(record, yearList) {
  let recordYear = record.date.getFullYear().toString()
  // 如果yearlist存在recordYear為true，則yearlist會執行:以前的語法新增recordYear
  // has() 方法對一個指定值元素在 Set 物件中的存在與否回傳一個布林值
  // add() 會在一個 Set 物件的尾端加上一個指定 value 的新元素
  !yearList.has(recordYear) ? yearList.add(recordYear) : ''
  return yearList
}

module.exports = getRecordYear
