const express = require('express');
const router = express.Router({ mergeParams: true });
const connString = require('../config').dbInfo;
const { Client } = require('pg');

router.get('/', function(req, res) {
    const query = "SELECT * from prices where ticker = '" + req.params.id + "'ORDER BY date ASC" 
    const client = new Client({ connectionString: connString, ssl: { rejectUnauthorized: false } });
    client.connect();
    client.query(query, (err, results) => {
        if(err) throw (err);
        res.json(parseData(results.rows, req.params.id));
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

const parseData = (data, ticker) => {
    return [{
        name:ticker,
        series : data.map(e => { return {name: parseDate(e.date), value : e.value_close} }) 
    }]
}

const parseDate = (date) => {
    return date.toLocaleString().split(' ')[0].replace(/-/g, '/')
} 


module.exports = router;
