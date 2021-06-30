const { Item } = require('../models');

const itemData = [
  {
    name: 'Plain T-Shirt',
    description: 'a plain t-shirt',
    in_stock: 14,    
    price: 14.99,    
    category_id: 1,
  },
  {
    name: 'Running Sneakers',
    description: 'These shoes make you run really fast',  
    in_stock: 25,
    price: 90.0,
    category_id: 5,
  },
  {
    name: 'Branded Baseball Hat',
    description: 'hat signed by nolan ryan',
    in_stock: 12,
    price: 22.99,
    category_id: 4,
  },
  {
    name: 'Top 40 Music Compilation Vinyl Record',
    description: 'Only the best songs there are',
    in_stock: 50,
    price: 12.99,
    category_id: 3,
  },
  {
    name: 'Cargo Shorts',
    description: 'The kind your wife wont let you wear',
    in_stock: 22,
    price: 29.99,
    category_id: 2,
  },
];

const seedItems = () => Item.bulkCreate(itemData);

module.exports = seedItems;
