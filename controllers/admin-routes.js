const router = require('express').Router();
const { Item, Category } = require('../models');
const { withAdmin } = require('../utils/auth');

const findItems = async () => {
  return await Item.findAll({
    include: {
      model: Category,
      attributes: [['name', 'category_name']],
    }
  });
};

const findCategories = async () => {
  return await Category.findAll({});
};

// GET /admin
router.get('/', withAdmin, async (req, res) => {
  try {

    const items = await findItems();
    const plainItems = items.map((item) => item.get({ plain: true }));

    const categories = await findCategories();
    const plainCategories = categories.map((category) =>
      category.get({ plain: true })
    );

    res.render('admin-view', {
      items: plainItems,
      categories: plainCategories,
      loggedIn: req.session.loggedIn,
      is_admin: req.session.is_admin,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
