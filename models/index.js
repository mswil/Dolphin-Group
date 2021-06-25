// import models
const User = require('./User')
const Order = require('./Order');
const OrderItems = require('./OrderItems');
const Item = require('./Item');
const Category = require('./Category');

// Create associations


// Items belongsTo Category
Item.belongsTo(Category)
// Categories have many Items
Category.hasMany(Item)
// Products belongToMany Orders (through OrderItems)
Item.belongsToMany(Order, {
  through: OrderItems
})
// Order belongToMany Items (through OrderItems)
Order.belongsToMany(Item, {
  through: OrderItems
})

module.exports = {
  User,
  Order,
  OrderItems,
  Item,  
  Category
};
