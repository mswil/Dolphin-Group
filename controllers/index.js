const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./home-routes');
const loginRoutes = require('./login-routes');

router.use('/api', apiRoutes);
router.use('/user', loginRoutes);
router.use('/', homeRoutes);

router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;