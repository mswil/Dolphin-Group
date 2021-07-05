const router = require('express').Router();
const { User, Order, Item, OrderItems } = require('../../models');
const { withAuth, withAuthApi } = require('../../utils/auth');

// GET /api/orders
router.get('/', (req, res) => {
  Order.findAll({
    include: [
      {
        model: User,
        attributes: ['email'],
      },
      {
        model: OrderItems,
        attributes: ['id', 'amount_ordered'],
        include: {
          model: Item,
          attributes: [['id', 'item_id'], 'name', 'price'],
        },
      },
    ],
  })
    .then((dbOrderInfo) => res.json(dbOrderInfo))
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });
});

// GET /api/orders/id
router.get('/id', (req, res) => {
  Order.findOne({
    where: {
      id: req.session.user_id,
    },
    include: [
      {
        model: User,
        attributes: ['email'],
      },
      {
        model: OrderItems,
        attributes: ['amount_ordered'],
        include: {
          model: Item,
          attributes: [['id', 'item_id'], 'name', 'price'],
        },
      },
    ],
  })
    .then((dbOrderInfo) => {
      if (!dbOrderInfo) {
        res.status(404).json({ message: 'Order does not exist' });
        return;
      }
      res.json(dbOrderInfo);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });
});

// POST /api/orders
router.post('/', withAuthApi, (req, res) => {
  // expects {"user_id": #}
  Order.create({
    user_id: req.session.user_id,
  })
    .then((dbOrderInfo) => res.json(dbOrderInfo))
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });
});

// POST /api/orders/add-item
router.post('/add-item', withAuthApi, (req, res) => {
  // expects {"item_id": #, "order_id": #, "amount_ordered": #}
  OrderItems.create(req.body)
    .then((dbOrderItem) => res.json(dbOrderItem))
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });
});

// PUT /api/order/update-item-amount/:id
router.put('/update-item-amount/:id', withAuthApi, (req, res) => {
  // expects {"amount_ordered": #}
  OrderItems.update(
    {
      amount_ordered: req.body.amount_ordered,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((dbOrderItem) => {
      if (!dbOrderItem) {
        res.status(404).json({ message: 'Order does not contain item' });
      }
      res.json(dbOrderItem);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });
});

// DELETE /api/orders/:id
router.delete('/:id', withAuthApi, (req, res) => {
  Order.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbOrderInfo) => {
      if (!dbOrderInfo) {
        res.status(404).json({ message: 'Order does not exist' });
        return;
      }
      res.json(dbOrderInfo);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });
});

// DELETE /api/orders/remove-item/:id
router.delete('/remove-item/:id', withAuthApi, (req, res) => {
  OrderItems.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbOrderItem) => {
      if (!dbOrderItem) {
        res.status(404).json({ message: 'Order does not contain item' });
      }
      res.json(dbOrderItem);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });
});

router.use('/place-order', withAuth, (req, res) => {
  //execute the write file code here
});

module.exports = router;
