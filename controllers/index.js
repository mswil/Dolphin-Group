const router = require('express').Router();
const { Item } = require('../models');
const apiRoutes = require('./api');
const homeRoutes = require('./home-routes');
const adminRoutes = require('./admin-routes');
const cartRoutes = require('./cart-routes');
const loginRoutes = require('./login-routes');

router.use('/api', apiRoutes);
router.use('/', homeRoutes);
router.use('/admin', adminRoutes);
router.use('/cart', cartRoutes);
router.use('/login', loginRoutes);

router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;
