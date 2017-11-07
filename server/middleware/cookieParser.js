const parseCookies = (req, res, next) => {
  //console.log('PARSE COOKIES', req);
  req.cookies = {};

  if (req.headers.cookie) {
    
    if (req.headers.cookie.length < 60) {
      req.cookies[req.headers.cookie.substring(0, 9)] = req.headers.cookie.substring(10);
      
    } else {
      
      var split = req.headers.cookie.split(';');
      for (var i = 0; i < split.length; i++) {
        
        var a = split[i].indexOf('=');
        var key = split[i].substring(0, a);
        var val = split[i].substring(a + 1);

        if (key[0] === ' ') {
          key = key.substring(1);
          
        }
        req.cookies[key] = val;
      }
    }
    
  }
  next();
};

module.exports = parseCookies;