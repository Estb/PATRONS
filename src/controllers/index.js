const crypto = require('crypto')
const Models = require('../models/Users')
const jwtConfig = require('../config/jwt')
const apiConfig = require('../config/apikey')
const jwt = require('jsonwebtoken')

//const Models = require('../models/Requisitions')
const Status = require('http-status')
const controller = require('./index')

exports.verifyJWT = (req, res, next) => {
  const token = req.headers['x-access-token']
  if(!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
  
  jwt.verify(token, jwtConfig.secret , function(err, decoded) {
    if (err) return res.status(401).send({ auth: false, message: 'Failed to authenticate token.' });
    req.userId = decoded.userId
      next();
    })
  }

exports.apikey = (req, res, next) => {
  const apikey = req.body.apikey
  if(!apikey) return res.status(401).send({ auth: false, message: 'No Api Key provided.' });
  if(apikey !=apiConfig.secret) return res.status(401).send({ auth: false, message: 'Failed to authenticate Api Key.' });
  next();
}


FindUser = (id) => {
    Models.findOne({id, where: {id:id}})
    .then(user => {
      if(!user) {
        const fu = 1
      } else {
        const fu = 0
      }
      return fu
    })
    .catch((error) => next(error))
}

today = () => {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();
  
      if (dd < 10) {
        dd = '0' + dd;
      }
  
      if (mm < 10) {
        mm = '0' + mm;
      }
      today = mm + '/' + dd + '/' + yyyy;
      var utc = new Date().toJSON().slice(0,10).replace(/-/g,'/');
      
      return today
}

getSHA1ofJSON = (a) => {
    return crypto.createHash('sha1').update(JSON.stringify(a)).digest('hex')
}

makeid = (length) => {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
  return result;
}


checkid = (userId) => {
  return new Promise((resolve, reject) => {
    Models.findOne({userId, where: {userId:userId}})
    .then(userId => {
      if(userId) {
        var fu = 0
        resolve(fu)
      } 
      else {
        var fu = 1
        resolve(fu)
      }
    })
    .catch("erro")
  })
}


trueID = (a) => {
  var userId = makeid(a)
  return new Promise((resolve, reject) => {
    resolve(checkid(userId).then((fu)=>{
      if(fu==1){
        return userId
      }else {
        trueID(a)
        console.log("+1")
      }

    }))
  })
}
