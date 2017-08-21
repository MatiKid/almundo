var express = require('express'),
app = express(),
port = process.env.PORT || 3000,
mongoose = require('mongoose'),
Hotel = require('./api/models/hotelsListModel'), //created model loading here
bodyParser = require('body-parser');

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/Hoteldb'); 


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routes = require('./api/routes/hotelsListRoutes'); //importing route
routes(app); //register the route


app.listen(port);


console.log('Hotels list RESTful API server started on: ' + port);