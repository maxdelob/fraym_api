var express = require('express');
var router = express.Router();
const connString = require('../config').dbInfo;
const { Client } = require('pg');

router.get('/:id', function(req, res) { 
    const client = new Client({ connectionString: connString, ssl: { rejectUnauthorized: false } });
    client.connect();
    let query = 'SELECT * from companies'
    if(req.params.id){
        query = query + " WHERE ticker = '" + req.params.id + "'"
    }
    client.query(query, (err, results) => {
        if(err) throw (err);
        res.json(results.rows);
        client.end();
    })
});
module.exports = router;
