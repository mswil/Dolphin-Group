const { Order } = require('../models');

const orderData = [
  {
    user_id: 1,
  }
];

const seedOrder = () => Order.bulkCreate(orderData);

module.exports = seedOrder;