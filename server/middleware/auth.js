const models = require('../models');
const Promise = require('bluebird');

module.exports.createSession = (req, res, next) => {
  res.cookies = {shortlyid: {value: 12345}};
  //res.cookies['shortlyid']['value'] = 12345;
  req.session = {hash: '' + Math.random()};
  next();
};

/************************************************************/
// Add additional authentication middleware functions below
/************************************************************/

