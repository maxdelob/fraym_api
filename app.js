const express = require( "express" );
const port = process.env.PORT || 3000;
const app = express();
var cors = require('cors');
const companies = require('./routes/companies')
const chartData = require('./routes/chart-data')
app.use(cors())
app.use('/companies', companies)
app.use('/chart/:id', chartData)

app.listen(port, () => {
    console.log( `server started at http://localhost:${ port }` );
} );