var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var data;
  console.log('routes/index/req : ',req.session)
  if(req.session.user){
    data = {
      isLogin: true,
      user: req.session.user
    }
  }else {
    data = {
      isLogin: false
    }
  }
  console.log('routes/index/data : ',data)
  res.render('index', data);
});

module.exports = router;
