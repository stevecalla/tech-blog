const { User } = require('../models');
const bcrypt = require('bcrypt');

//get password hash b/c bulk create is not hashing the password
// let passwordCrypt = async (pass) => {
//   let b = await bcrypt.hash(pass, 10);
//   console.log('hashed password 1 = ', b);
//   return b;
// }
// passwordCrypt('password1234');

const userdata = [
  {
    username: 'x',
    email: 'x@email.com',
    password: '$2b$10$i04d5fOSq2PgJe5o1MFn8elmHAXyzJHIn5h7KxCMMlq/dqQ.XepOy',
  },
  {
    username: 'y',
    email: 'y@email.com',
    password: '$2b$10$i04d5fOSq2PgJe5o1MFn8elmHAXyzJHIn5h7KxCMMlq/dqQ.XepOy',
  },
  {
    username: 'z',
    email: 'z@email.com',
    password: '$2b$10$i04d5fOSq2PgJe5o1MFn8elmHAXyzJHIn5h7KxCMMlq/dqQ.XepOy',
  },
];

const seedUsers = () => User.bulkCreate(userdata);

module.exports = seedUsers;
