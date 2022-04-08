module.exports = {
  isEqual: (arg1, arg2, options) => {
    if (arg1 === arg2) return options.fn(this)
    else options.inverse(this)
  },
}