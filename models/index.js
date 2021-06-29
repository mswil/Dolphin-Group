// import models
const User = require('./User')
const Order = require('./Order');
const OrderItems = require('./OrderItems');
const Item = require('./Item');
const Category = require('./Category');

// Create associations


// User
User.hasMany(Order);
Order.belongsTo(User);

Item.belongsToMany(Order, {
  through: OrderItems,
})
Order.belongsToMany(Item, {
  through: OrderItems,
})

// Order
Order.hasMany(OrderItems);
OrderItems.belongsTo(Order);

// OrderItems
OrderItems.belongsTo(Item);
Item.hasMany(OrderItems);

// Item
Item.belongsTo(Category);
Category.hasMany(Item);

module.exports = {
  User,
  Order,
  OrderItems,
  Item,  
  Category
};
