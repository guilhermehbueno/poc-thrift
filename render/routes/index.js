var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res) {
  res.render("index", { title: 'Express' });
});

/* GET home page. */
router.get('/:templateName', function(req, res) {
  var templateName = req.params.templateName;
  console.log(req.cookies);
  if(!templateName){
    templateName = "index";
  }
  res.render(templateName, { title: 'Express' });
});

module.exports = router;
