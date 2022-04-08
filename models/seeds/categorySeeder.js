const db = require ('../../config/mongoose')
const Category = require ('../category')

const categoryList = require ('../../config/category.json').category

// Generate category seed
db.once('open', () => {
  Category.create(categories)
  .then (() => {
    db.close()
  })
  .catch(err => console.log(err))
})