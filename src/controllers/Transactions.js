const Models = require('../models/Transactions')
const userModels = require('../models/Users')
const Status = require('http-status')
const controller = require('./index')

exports.findone = (req, res, next) => {
  const userId = req.userId
  const txn_id = req.body.txn_id

  Models.findOne({txn_id, where: {txn_id:txn_id, userId:userId}})
  .then(transaction => {
    if(transaction){
      res.status(200).send(transaction)
    } else {
      res.status(404).send({sucess: false, message: 'Transaction not found' , statusCode: 404})
    }
  })
  .catch(error => next(error))
}

exports.findAll = (req, res, next) =>{

  const userId = req.userId

  Models.findAll({userId, where: {userId:userId}})
        .then((transactions) => {
          if(transactions) {
            res.send(transactions)
          } else {
            res.status(404).send({sucess: false, message: 'Transaction not found' , statusCode: 404})
          }
        })
        .catch((error) => next(error))
}


exports.create = (req, res, next ) => {

  const userId = req.userId
  const txn_id = req.body.txn_id
  const endereco = req.body.endereco
  const amount = req.body.amount
  const valor = req.body.valor
  const currency1 = req.body.currency1
  const currency2 = req.body.currency2
  const item_name = req.body.item_name
  const item_number = req.body.item_number
  const custom = req.body.custom
  const invoice = req.body.invoice

  if(userId) {
    userModels.findOne({userId, where: {userId:userId}})
    .then(user => {
      if(user) {
  Models.create({
    userId : userId,
    txn_id : txn_id,
    endereco : endereco,
    amount : amount,
    valor : valor,
    currency1 : currency1,
    currency2 : currency2,
    item_name : item_name,
    item_number : item_number,
    custom : custom,
    invoice : invoice
    })
    .then( () => {
      res.status(201).send({sucess: true, message: 'created' , statusCode: 201});        
    })
    .catch((error) => next(error))
      } else {
        res.status(500).send({sucess: false, message: 'id not match' , statusCode: 500})
      }
    })
    .catch((error) => next(error))
  } else {
    res.status(500).send({sucess: false, message: 'error, update and try again' , statusCode: 500})
  }
}


  exports.update = (req, res, next) => {
    const txn_id = req.body.txn_id
    const finalizado = req.body.finalizado
  
    if(txn_id) {
    Models.findOne({txn_id, where: {txn_id:txn_id}})
    .then(transaction => {
      if(transaction) {
     // const userId =req.userId
            Models.update(
              {
                finalizado : finalizado
              },
              {where: {txn_id:txn_id}}
            )
            .then( () => { 
              res.status(200).send({sucess: true, message: 'updated' , statusCode: 200})
            })
            .catch (error => next (error))
      } else {
        res.status(404).send({sucess: false, message: 'Transaction not found' , statusCode: 404})
  
      }
    })
    .catch (error => next (error))
    } else {
      res.status(422).send({sucess: false, message:'Txid is required', statusCode: 422})
    }
  }