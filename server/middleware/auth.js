const models = require('../models');
const Promise = require('bluebird');
const db = require('../db');

module.exports.createSession = (req, res, next) => {
  if (req.cookies.shortlyid === undefined) {
    console.log('IFFFFFFFFFFF');
    models.Sessions.create().then(result => {
    //console.log('CREATING SESSION', result);
    //req.session = {hash: '' + Math.random(), user: {username: req.body.username}, userId: 1};
      models.Sessions.get({id: result.insertId}).then(data => {
        res.cookies.shortlyid = {value: data.hash};
        req.session = {hash: data.hash};  
      }).then(result => {
        next(); 
      });
    
    });
  } else {
    console.log('ELSEEEEEEEEEE');
    models.Sessions.create().then(result => {
    //console.log('CREATING SESSION', result);
    //req.session = {hash: '' + Math.random(), user: {username: req.body.username}, userId: 1};
      models.Sessions.get({id: result.insertId}).then(data => {
        req.session = {hash: data.hash};
        models.Sessions.get({hash: req.cookies.shortlyid}).then (rowWithHash => {
          //console.log('USERNAME', rowWithHash.user.username);
          //console.log('USER ID', rowWithHash.userId)
          // console.log('USER ID', rowWithHash);
          if (rowWithHash.userId === null) {
            return;
          } else {
            req.session.user = {username: rowWithHash.user.username};
            req.session.userId = rowWithHash.userId;
          }
        }).then(result => {
          next(); 
        });
        //, userId: result.insertId, user: {username: 'BillZito'}
      });
    
    });
    
  }
  //res.cookies = {shortlyid: {value: 12345}};
  //console.log('REQUEST', req);
  
};
  
//res.cookies['shortlyid']['value'] = 12345;

// console.log('LOOKING FOR USERNAME', req.cookies.shortlyid, typeof req.cookies.shortlyid);
// if (req.cookies.shortlyid) {
//   console.log('WHERE MY COOKIES?!', req.cookies.shortlyid);
//   models.Users.get({username: 'BillZito'}).then(result => console.log('INSIDE FIRST PROMISE', result));
  
//   models.Sessions.get({hash: req.cookies.shortlyid}).then(result => console.log('INSIDE PROMISE', result));
// }
  

/************************************************************/
// Add additional authentication middleware functions below
/************************************************************/

