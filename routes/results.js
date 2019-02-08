var express = require('express');
var router = express.Router();
let db = require('../data/dbinit').dbAcc;


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('results', {title: 'More Science!'});
});

router.get('/data', function(req, res, next) {
  db.getDB().collection('realData').find({}).toArray((err, result) => {
    if (err) throw err;
    res.send(result)
  });
});

module.exports = router;
