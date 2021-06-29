const { User } = require('../models');

const userData = [
  {
    email: 'test@gmail.com',
    password: '123456',
    is_admin: true
  }
];

const seedUser = () => User.bulkCreate(userData);

module.exports = seedUser;