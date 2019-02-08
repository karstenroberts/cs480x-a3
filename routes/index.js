var express = require('express');
var router = express.Router();
let db = require('../data/dbinit').dbAcc;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Science!' });
});

router.post('/', function(req, res, next) {
  db.getDB().collection('test').save(req.body, (err, result) => {
    if (err) return console.log(err);
    console.log("saved to database!");
    res.redirect('/')
  });
});



module.exports = router;
