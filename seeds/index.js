const seedCategories = require('./category-seeds');
const seedItems = require('./item-seeds');
const seedUser = require('./user-seeds');
const seedOrder = require('./order-seeds');
const seedOrderItems = require('./order-items-seeds');


const sequelize = require('../config/connection');

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log('\n----- DATABASE SYNCED -----\n');
  await seedCategories();
  console.log('\n----- CATEGORIES SEEDED -----\n');

  await seedItems();
  console.log('\n----- ITEMS SEEDED -----\n');

  await seedUser();
  console.log('\n----- USERS SEEDED -----\n');

  await seedOrder();
  console.log('\n----- ORDERS SEEDED -----\n');

  await seedOrderItems();
  console.log('\n----- ORDERS ITEMS SEEDED -----\n');

  process.exit(0);
};

seedAll();
