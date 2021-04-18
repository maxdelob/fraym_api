const express = require( "express" );
const port = process.env.PORT || 3000;
const app = express();
const companies = require('./routes/companies')
const chartData = require('./routes/chart-data')
app.use('/companies', companies)
app.use('/chart/:id', chartData)

app.listen(port, () => {
    console.log( `server started at http://localhost:${ port }` );
} );