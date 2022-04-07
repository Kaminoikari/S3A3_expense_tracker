function twoDigit(num) {
  if (Number(num) < 10) {
    return `0${Number(num).toString()}`
  } else return num.toString()
}

function timeFormat(date) {
  let dateFormat = `${date.getFullYear()}-${twoDigit(
    date.getMonth() + 1
  )}-${twoDigit(date.getDate())}`
  return dateFormat
}

module.exports = timeFormat
