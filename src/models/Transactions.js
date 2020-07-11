const Sequelize = require('sequelize')
const database = require('../database/database')


const Transactions = database.define('transactions', {

  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  userId: {
    allowNull: false,
    type: Sequelize.STRING(10)
  },
  txn_id:{
    allowNull: false,
    type: Sequelize.STRING(255)
  },
  endereco: {
    allowNull: false,
    type: Sequelize.STRING(40)
  },
  amount: {
    allowNull: false,
    type: Sequelize.STRING
  },
  valor: {
    allowNull: false,
    type: Sequelize.STRING
  },
  currency1:{
    allowNull: false,
    type: Sequelize.STRING
  },
  currency2:{
    allowNull: false,
    type:Sequelize.STRING
  },
  finalizado:{
    allowNull: false,
    type: Sequelize.INTEGER,
    defaultValue: '0'
  },
  item_name:{
    allowNull: true,
    type: Sequelize.STRING(40)
  },
  item_number:{
    allowNull: true,
    type: Sequelize.STRING(40)
  },
  custom:{
    allowNull: true,
    type: Sequelize.STRING(40)
  },
  invoice:{
    allowNull: true,
    type: Sequelize.STRING(40)
  }
})

module.exports = Transactions