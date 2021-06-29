const { OrderItems } = require('../models');

const oderItemsData = [
  {
    item_id: 1,
    order_id: 1,
    amount_ordered: 1
  }
];

const seedOrderItems = () => OrderItems.bulkCreate(oderItemsData);

module.exports = seedOrderItems;