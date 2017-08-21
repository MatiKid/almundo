var express = require('express'),
app = express(),
port = process.env.PORT || 3000,
mongoose = require('mongoose'),
Hotel = require('./api/models/hotelsListModel'),
bodyParser = require('body-parser'),
cors = require('cors');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/Hoteldb'); 

app.use(cors({origin: 'http://localhost:9000'}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routes = require('./api/routes/hotelsListRoutes');
routes(app);

app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
});

app.listen(port);


console.log('Hotels list RESTful API server started on: ' + port);