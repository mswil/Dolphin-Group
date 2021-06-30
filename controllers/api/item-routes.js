const router = require('express').Router();
const { Item, OrderItems } = require('../../models');
const { withAdmin } = require('../../utils/auth');

// GET /api/items
router.get('/', (req, res) => {
    Item.findAll({
        include: {
            model: OrderItems,
            attributes: ['amount_ordered']
        }
    })
        .then(dbItemData => res.json(dbItemData))
        .catch(err => {
            console.error(err);
            res.status(500).json(err);
        });
})

// GET /api/items/:id
router.get('/:id', (req, res) => {
    Item.findOne({
        where: {
            id: req.params.id
        },
        include: {
            model: OrderItems,
            attributes: ['amount_ordered']
        }
    })
        .then(dbItemData => {
            if (!dbItemData) {
                res.status(404).json({ message: 'There is no item with that Id' });
                return;
            }
            res.json(dbItemData);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json(err);
        });
});

// POST /api/items
router.post('/', withAdmin, (req, res) => {
    // expects {"name": "item-name", "description": "best item ever", "price": ##.##, "in_stock": #, "category_id": #}
    Item.create({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        in_stock: req.body.in_stock,
        category_id: req.body.category_id
    })
        .then(dbItemData => res.json(dbItemData))
        .catch(err => {
            console.error(err);
            res.status(500).json(err);
        });
});

// PUT /api/items/:id
router.put('/:id', withAdmin, (req, res) => {
    // expects {"name": "item-name", "description": "best item ever", "price": ##.##, "in_stock": #, "category_id": #}
    Item.update(
        {
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            in_stock: req.body.in_stock,
            category_id: req.body.category_id
        },
        {
            where: {
                id: req.params.id
            }
        })
        .then(dbItemData => {
            if (!dbItemData) {
                res.status(404).json({ message: 'There is no item with that Id' });
                return;
            }
            res.json(dbItemData);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json(err);
        });
});

// DELETE /api/items/:id
router.delete('/:id', withAdmin, (req, res) => {
    Item.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbItemData => {
            if (!dbItemData) {
                res.status(404).json({ message: 'There is no item with that Id' });
                return;
            }
            res.json(dbItemData);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json(err);
        });
})

module.exports = router;
