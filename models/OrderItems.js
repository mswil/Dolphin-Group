const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class OrderItems extends Model {}

OrderItems.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    item_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'item',
        key: 'id'
      }
    },
    order_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'order',
        key: 'id'
      }      
    },
    amount_ordered: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 10,
      validate: {
        isNumeric: true
      }
    }    
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'order_items',
  }
);

module.exports = OrderItems;
