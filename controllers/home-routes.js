const router = require('express').Router();
const sequelize = require('../config/connection');
const { Item, Category } = require('../models');

const findItems = async (itemName, categoryId) => {
    const include = {
        model: Category,
        attributes: [['name', 'category_name']]
    }

    const where = {}
    if (itemName) {
        where.name = itemName;
    }
    if (categoryId) {
        where.category_id = parseInt(categoryId);
    }

    return await Item.findAll({ where, include });

}

const findCategories = async () => {

    return await Category.findAll({});
}

router.get('/', async (req, res) => {
    
    try {
        // http://localhost:3001/?item_name=name
        const items = await findItems(req.query.item_name, req.query.category_id);
        // http://localhost:3001/?category_id=#
        const categories = await findCategories();
         res.render('homepage', {
             items,
             categories,
             loggedIn: req.session.loggedIn,
             isAdmin: req.session.isAdmin
         })
    }
    catch (err) {
        res.status(500).json(err)
    }
});



module.exports = router;
