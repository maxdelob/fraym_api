# API FRAYM 

This repository is where I store my Express.js project and a folder with my Python file I used to load the database.

I am familiar with Express.js. I also use it because it's fast, compacted and performing. This project is deployed on Heroku.

The API is connected to a PostgreSQL database hosted by Heroku. You can find the connexion information from the config folder.

# Loading Quandl data to the database

The DATA_MINING project contains the Python file used to load data from the Quandl API to the Heroku Database. 

Please note that not all companies were available for free. Thus, I had to filter the companies list using a commented function. 

You can see the data loading logs in data_processing.log.


# run locally 


Run `npm i`

Run `npm start` for a dev server. Navigate to `http://localhost:3000/`. The app will automatically reload if you change any of the source files.

You can test endpoints as following : 

[Companies](http://localhost:3000/companies)

[Chart data](http://localhost:3000/chart/AAPL)

[Chart dates](http://localhost:3000/chart/AAPL/dates)


# Useful links for the developement 


[Quandl API doc](https://www.quandl.com/data/EOD-End-of-Day-US-Stock-Prices/documentation)


[Express summary](https://www.smashingmagazine.com/2020/04/express-api-backend-project-postgresql)


[Express routes](https://xpertphp.com/node-js-routes-in-separate-file-using-express/)


[Express Db integration](https://expressjs.com/en/guide/database-integration.html#postgresql)


[Heroku deployment](https://dzone.com/articles/deploy-your-node-express-app-on-heroku-in-8-easy-s)





