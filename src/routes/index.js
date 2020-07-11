const express = require('express');
const transactions = require('../controllers/Transactions')
const users = require('../controllers/User') 
const controller =require('../controllers/index')
const router = express.Router()



// transacoes


router.post('/v1/transactions', controller.apikey, controller.verifyJWT, transactions.create ) // create transaction

router.put('/v1/transactions', controller.apikey, transactions.update) // update transaction

router.post('/v1/transaction', controller.apikey, controller.verifyJWT, transactions.findone ) // find one transaction

router.post('/v1/transactions&all', controller.apikey, controller.verifyJWT, transactions.findAll) // find all transaction



// users

router.post('/v1/users',controller.apikey, users.createUser) // Creating a new user

router.get('/v1/users/confirm/:userKey', users.confirmUser) // Creating a new user

router.post('/v1/users/recoverypassword', controller.apikey, users.recoveryPassword) // recovery password

router.put('/v1/users/resetpassword', controller.apikey, users.resetPassword) // recovery password

router.post('/v1/users/auth',controller.apikey, users.login) //login

router.put('/v1/users',controller.apikey, controller.verifyJWT, users.updateUser) // Updating a user



// 2fa
//router.post('/v1/users/me/2fa-token', users.twofaToken) // Configuring 2fa Token

//router.get('/v1/users/me/2fa-token', users.copytwofaToken) // Generating 2fa Token copy


module.exports = router