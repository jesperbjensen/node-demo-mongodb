var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var kittySchema = mongoose.Schema({
    name: String
})
var Kitten = mongoose.model('Kitten', kittySchema)
mongoose.connect('mongodb://localhost/test');

/* GET home page. */
router.get('/', function(req, res) {

  // var silence = new Kitten({ name: 'Silence' })
  // silence.save(function(err, obj) {

  //   res.render('index', { title: obj.name });
  // });

  Kitten.find(function (err, kittens) {
    if (err) return console.error(err);

    res.render('index', { title: kittens[kittens.length-1].name });
  })

});

router.get('/add/:name', function(req, res) {
  var cat = new Kitten({ name: req.params.name })
  cat.save(function(err, obj) {
    res.send("OK");
  });

});

module.exports = router;
