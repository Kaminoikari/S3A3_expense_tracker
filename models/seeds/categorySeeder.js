const db = require ('../../config/mongoose')
const Category = require ('../category')

const categoryList = require ('../../config/category.json').category

// Generate category seed
db.once('open', async () => {
  try {
    await Promise.all(
      categoryList.map(async (item) => {
        let category = await Category.findOne({ name: item.name });
        if (!category) {
          return Category.create(item);
        }
      })
    );
    console.log('Category seeder build complete');
  } catch (e) {
    console.warn(e);
  } finally {
    process.exit();
  }
});