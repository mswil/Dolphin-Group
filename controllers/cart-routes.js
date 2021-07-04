const router = require('express').Router();
const sequelize = require('../config/connection');
const { Order, OrderItems, Item } = require('../models');
const { withAuth } = require('../utils/auth');

const findOrder = async (userId) => {
  return await Order.findOne({
    where: {
      user_id: userId,
    },
    include: {
      model: OrderItems,
      attributes: ['amount_ordered'],
      include: {
        model: Item,
        attributes: ['name', 'price', 'id'],
      },
    },
  });
};

// GET /cart
router.get('/', withAuth, async (req, res) => {
  try {
    const order = await findOrder(req.session.user_id);
    if (!order) {
      res.render('cart-view', {
        orderItem: [],
      });
    } else {
      const plainOrder = order.get({ plain: true });

      const orderItems = plainOrder.order_items.map((orderItem) => {
        return {
          name: orderItem.item.name,
          amount_ordered: orderItem.amount_ordered,
          price: orderItem.item.price,
          id: orderItem.item.id,
        };
      });

      res.render('cart-view', {
        orderItem: orderItems,
      });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
