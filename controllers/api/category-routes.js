const router = require('express').Router();
const { Category, Item } = require('../../models');
const { withAdmin, withAdminApi } = require('../../utils/auth');

// GET /api/categories
router.get('/', (req, res) => {
    Category.findAll({
        include: {
            model: Item,
            attributes: ['name']
        }
    })
        .then(dbCategoryData => res.json(dbCategoryData))
        .catch(err => {
            console.error(err);
            res.status(500).json(err);
        });
});

// GET /api/categories/:id
router.get('/:id', (req, res) => {
    Category.findOne({
        where: {
            id: req.params.id,
        },
        include: {
            model: Item,
            attributes: ['name']
        }
    })
        .then(dbCategoryData => {
            if (!dbCategoryData) {
                res.status(404).json({ message: 'There is no category with that Id' });
                return;
            }
            res.json(dbCategoryData)
        })
        .catch(err => {
            console.error(err);
            res.status(500).json(err);
        });
});

// POST /api/categories
router.post('/', withAdminApi, (req, res) => {
    // expect {"name": "asdf"}
    Category.create(req.body)
        .then(dbCategoryData => res.json(dbCategoryData))
        .catch(err => {
            console.error(err);
            res.status(500).json(err);
        });
});

// DELETE /api/categories/:id
router.delete('/:id', withAdminApi, (req, res) => {
    Category.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbCategoryData => {
            if (!dbCategoryData) {
                res.status(404).json({ message: 'There is no category with that Id' });
                return;
            }
            res.json(dbCategoryData);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json(err);
        });
});

module.exports = router;