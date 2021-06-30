const router = require('express').Router();
const { User, Order, Item, OrderItems } = require('../../models');

// GET /api/users
router.get('/', (req, res) => {
  User.findAll({ attributes: { exclude: ['password'] } })
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });
});

// GET /api/users/:id
router.get('/id', (req, res) => {
  User.findOne({
    where: {
      id: req.session.user_id,
    },
    attributes: { exclude: ['password'] },
    include: [
      {
        model: Order,
        attributes: [['id', 'order_id']],
        include: {
          model: Item,
          attributes: [['name', 'item_name'], 'description', 'price'],
          through: OrderItems,
        },
      },
    ],
  })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: 'There is no user with that Id' });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });
});

// POST /api/users
router.post('/', (req, res) => {
  User.findOne({
    where: {
      email: req.body.email,
    },
    attributes: { exclude: ['password'] },
  })
    .then((dbUserData) => {
      if (dbUserData) {
        throw { message: 'An account for this email already exists' };
      }

      // expects {"email": "email@email.com", "password": "asdf", "is_admin": true}
      return User.create({
        email: req.body.email,
        password: req.body.password,
        is_admin: req.body.is_admin,
      });
    })
    .then((dbCreateUserData) => {
      req.session.save(() => {
        req.session.user_id = dbCreateUserData.id;
        req.session.email = dbCreateUserData.email;
        req.session.is_admin = dbCreateUserData.is_admin;
        req.session.loggedIn = true;

        res.json(dbCreateUserData);
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });
});

module.exports = router;
