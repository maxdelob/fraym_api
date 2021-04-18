var express = require('express');
var router = express.Router();

// 'SELECT $1 AS value', 123
router.get('/', function(req, res, next) { 
    res.end('Welcome to chart page');
});
module.exports = router;
