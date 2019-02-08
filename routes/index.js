var express = require('express');
var router = express.Router();
let db = require('../data/dbinit').dbAcc;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Science!' });
});

router.post('/', function(req, res, next) {
  db.getDB().collection('data').save(req.body, (err, result) => {
    if (err) return console.log(err);
    console.log("saved to database!");
    res.redirect('/')
  });
});

router.get('/user', function(req, res, next) {
  db.getDB().collection('users').find().sort({_id: -1}).limit(1).toArray((err, result) => {
    console.log(result);
    if (err) throw err;
    res.send(result)
  });
});

router.post('/user', function(req, res, next) {
  db.getDB().collection('users').save(req.body, (err, result) => {
    if (err) return console.log(err);
    console.log("saved user to database!");
    res.redirect('/')
  })
});


module.exports = router;
