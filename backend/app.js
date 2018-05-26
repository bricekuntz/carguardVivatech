//require
let express = require('express');
let env = process.env.NODE_ENV || 'development';
let config = require('./config/config')[env];

let app = express();

// CrossDomain
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Methods', '*');
    next();
});


var user = require('./routes/user');
var service = require('./routes/service');
var provider = require('./routes/provider');
var car = require('./routes/car');



app.use('/users', user);
app.use('/cars', car);
app.use('/providers', provider);
app.use('/services', service);



// Mongoose connection
var mongoose = require('mongoose');
var mongoDB = config.database.url;
mongoose.connect(mongoDB);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));



//app listening
app.listen(config.server.port, function () {
    console.log('app listening on port ' + config.server.port)
});


