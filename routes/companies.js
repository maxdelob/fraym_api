var express = require('express');
var router = express.Router();
const connString = require('../config').dbInfo;
const { Client } = require('pg');

router.get('/', function(req, res) { 
    const client = new Client({ connectionString: connString, ssl: { rejectUnauthorized: false } });
    client.connect();
    client.query('SELECT * from companies', (err, results) => {
        if(err) throw (err);
        res.json(results.rows);
    })
});
module.exports = router;
