var express = require('express');
var bodyParser = require('body-parser');
//var cookieParser = require('cookie-parser');
var path = require('path');
var logger = require('morgan');
var app = express();

/*
## REST Mecanisms sources
 http://thejackalofjavascript.com/architecting-a-restful-node-js-app/
*/

// Middleware
app.use(logger('dev'));
app.use(bodyParser.json());

app.all('/*', function(req, res, next) {
    // CORS headers
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    // Custom headers
    res.header('Access-Control-Allow-Headers', 'Content-Type,Accept,X-Access-Token,X-Key');
    if (req.method == 'OPTIONS') {
        res.status(200).end();
    } else {
        next();
    }
});



// Auth MiddleWare - Check if the token is valid
// Only the request that start with /api/v1/* will be checked
// The others should be avoided


app.all('/api/v1/*', [require('./middlewares/validateRequest')]);
app.use('/', require('./routes'));


// If no route is matched, send a 404

app.use(function(req, res, next){
    res.status(404).send({
      "status": 404,
      "message": "Not found !"
    });
});


// Start the server
//server.listen(3000);

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function() {
    console.log('Server listening on port ' + server.address().port)
});
