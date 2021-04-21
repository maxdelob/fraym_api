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
    return data.map(e => { return {name: parseName(e), value : [parseDate(e.date), e.value_close]} })
}

const parseDate = (date) => {
    return date.toLocaleString().split(' ')[0].replace(/-/g, '/')
} 
const parseName = (data) => {
    return data.date
}

module.exports = router;
