const Sequelize = require('sequelize')
const database = require('../database/database')
const Transactions = require('./Transactions')

const Users = database.define('users', {

  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  userId: {
    allowNull: false,
    primaryKey: true,
    type: Sequelize.STRING(10)
  },
  name:{
    allowNull: false,
    type: Sequelize.STRING(255),
    validate: {
        len: [2, 255]
    }
  },
  lastname: {
    allowNull: false,
    type: Sequelize.STRING(255),
    validate: {
        len: [2, 255]
    }
  },
  password: {
    allowNull: false,
    type: Sequelize.STRING(255),
    validate: {
        len: [8, 255],
     //   isAlphanumeric:true
    }
  },
  email:{
    allowNull: false,
    type: Sequelize.STRING(255),
    validate: {
      isEmail: {
        args: true,
        msg: "Must be a valid email"
      }
    }
  },
  verified:{
    allowNull: false,
    type: Sequelize.BOOLEAN,
    defaultValue:0
  },
  verified_at:{
    allowNull: true,
    type: Sequelize.STRING,
    isDate: true
  },
  role:{
    allowNull: false,
    type: Sequelize.STRING(20),
    defaultValue:'user'
  },
  active:{
    allowNull: false,
    type: Sequelize.BOOLEAN,
    defaultValue:1
  },
  idreferral:{
    allowNull: false,
    type: Sequelize.STRING(20),
  },
  referenciado:{
    allowNull: false,
    type: Sequelize.STRING(20),
    defaultValue: '0'
  },
  quotas:{
    allowNull: false,
    type: Sequelize.INTEGER,
    defaultValue: '0'
  },
  userKey:{
    allowNull: true,
    type: Sequelize.STRING(30),
  },
  newKey_at:{
    allowNull: true,
    type: Sequelize.STRING,
    isDate: true
  },
  resetpass_at:{
    allowNull: true,
    type: Sequelize.STRING,
    isDate: true
  },
  deleted_at:{
    allowNull: true,
    type: Sequelize.STRING,
    isDate: true
  }
}, {underscored: true})

Users.hasMany(Transactions, { foreignKey: 'userId' }); // Will add userId to Task model
Transactions.belongsTo(Users); // Will also add userId to Task model

module.exports = Users
