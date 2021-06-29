const router = require('express').Router();
const sequelize = require('../config/connection');

router.get('/', async (req, res) => {
  try {
    res.render('admin-view');
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
