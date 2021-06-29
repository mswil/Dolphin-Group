const router = require('express').Router();
const sequelize = require('../config/connection');
const { Item, Category } = require('../models');

const findItems = async itemName => {

    const include = {
        model: Category,
        attributes: [['name', 'category_name']]
    }

    if (itemName) {
        const items = await Item.findAll({
            where: {
                name: itemName
            },
            include
        })
        if (items.length === 0) {
            throw { message: `No match for ${itemName}` }
        }
        return items;
    }
    else {
        const items = await Item.findAll({ include });
        return items;
    }
}

const findCategories = async categoryName => {
    const include = {
        module: Item
    }

    if(categoryName) {
        const categories = await Category.findAll({
            where: {
                name: categoryName
            },
            include
        })
        if (categories.length === 0) {
            throw { message: `No category called ${categoryName}`}
        }
        return categories;
    }
    else {
        const categories = await Category.findAll({include});
        return categories;
    }
}

router.get('/', (req, res) => {

    try {
        const items = await findItems();
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
