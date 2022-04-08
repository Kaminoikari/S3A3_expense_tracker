const db = require('../../config/mongoose');
const Record = require('../record');
const User = require('../user');
const bcrypt = require('bcryptjs');

const defaultUsers = [
  {
    //#1, 2, 3
    name: 'root1',
    password: '12345678',
    email: 'user1@example.com',
  },
  {
    name: 'root2',
    password: '12345678',
    email: 'user2@example.com',
  },
];

const defaultRecord = {
  name: 'PS5',
  category: 'entertainment',
  date: Date.now(),
  amount: 13000,
  merchant: 'PChome',
  userId: '',
};

db.once('open', async () => {
  try {
    for (i = 0; i < defaultUsers.length; i++) {
      let defaultUser = defaultUsers[i];
      let dbUser = await User.findOne({ email: defaultUser.email });
      if (dbUser) continue;

      //generate hash
      let salt = await bcrypt.genSalt(10);
      let hash = await bcrypt.hash(defaultUser.password, salt);
      //create new user in db
      let newUser = await User.create({
        name: defaultUser.name,
        password: hash,
        email: defaultUser.email,
      });

      //add new record
      await Record.create({ ...defaultRecord, userId: newUser._id });
    }
  } catch (e) {
    console.warn(e);
  } finally {
    console.log('record seeder has finished ');
    process.exit();
  }
});
