const express = require('express');
const router = express.Router({ mergeParams: true });
const connString = require('../config').dbInfo;
const { Client } = require('pg');

router.get('/', function(req, res) {
    const query = "SELECT * from prices where ticker = '" + req.params.id + "'" 
    const client = new Client({ connectionString: connString, ssl: { rejectUnauthorized: false } });
    client.connect();
    client.query(query, (err, results) => {
        if(err) throw (err);
        res.json(parseData(results.rows));
    })
});

router.get('/dates', function(req, res){
    const query = "select min(date), max(date) from prices  where ticker = '" + req.params.id + "'" 
    const client = new Client({ connectionString: connString, ssl: { rejectUnauthorized: false } });
    client.connect();
    client.query(query, (err, results) => {
        if(err) throw (err);
        res.json(results.rows);
    })
})

const parseData = (data) => {
    return data.map(e => { return {name: e.date, value : e.value_close} })
}

module.exports = router;
