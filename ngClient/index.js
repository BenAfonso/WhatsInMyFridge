// server.js

    // set up ========================
    var express  = require('express');
    var app      = express();                               // create our app w/ express
    var port = process.env.PORT || 8080;


    // configuration =====================================

    app.use('/node_modules', express.static(__dirname + '/node_modules/'));
    app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users

    app.get('/home', function(res,res){
      res.sendFile(__dirname+'/public/login.html');
    });

    // listen (start app with node server.js) ======================================
    app.listen(port,"0.0.0.0");
    console.log("App listening on port "+port);
