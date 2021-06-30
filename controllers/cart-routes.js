const router = require('express').Router();
const sequelize = require('../config/connection');
const { Order, OrderItems, Item } = require('../models');

const findOrder = async (userId) => {
  return await Order.findOne({
    where: {
      user_id: userId
    },
    include: {
      model: OrderItems,
      attributes: ['amount_ordered'],
      include: {
        model: Item,
        attributes: ['name', 'price']
      }
    }
  });
};

// GET /cart
router.get('/', async (req, res) => {
  try {
    const order = await findOrder(req.session.user_id);
    const plainOrder = order.get({ plain: true });

    res.render('cart-view', {
      order: plainOrder
    });
  }
  catch (err) {
    res.status(500).json(err)
  }
});


module.exports = router;
