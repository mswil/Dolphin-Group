const { OrderItems } = require('../models');

const orderItemsData = [
  {
    item_id: 1,
    order_id: 1,
    amount_ordered: 1,
  },
];

const seedOrderItems = () => OrderItems.bulkCreate(orderItemsData);

module.exports = seedOrderItems;
