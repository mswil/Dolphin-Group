const router = require('express').Router();
const { Item } = require('../models');
const apiRoutes = require('./api');

router.use('/api', apiRoutes);

router.use('/', (req, res) => {
  Item.findAll().then((dbData) => {
    const items = dbData.map((data) => data.get({ plain: true }));
    res.render('homepage', { items });
  });
});

module.exports = router;
