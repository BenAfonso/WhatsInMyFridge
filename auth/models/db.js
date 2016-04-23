var User = require('./User');
var pg = require('pg');
var conString = require('../config/config').url;
var db = {
  /**
  * Returns an object with associated methods
  *
  */
  getUserFromDb: function(username, fn) {
    db.userExists(username, function(err,res){
      // Query to get user's password (hashed) and salt
      if (err)
        return fn(err,null);
      if (res) {
      var client = new pg.Client(conString);
      client.connect(function(err) {
        if(err) {
          console.error('Could not connect to postgres', err);
          var err = new Error("Could not connect to postgres");
          err.http_code = 500;
          return fn(err,null);
        }
        client.query("SELECT * FROM USERS WHERE USERNAME = '"+username+"'", function(err, result) {
          if(err) {
            console.error('Error running query', err);
            var err = new Error("Error running query");
            err.http_code = 400;
            return fn(err,null);
          }
          client.end();

          return fn(null,new User(result.rows[0].iduser,result.rows[0].username,result.rows[0].password,result.rows[0].salt,result.rows[0].role));
        });
      });


    }else{
      return fn(new error("User doesn't exist !"), null);
    }
  });

  },

  userExists: function(username, fn) {
    // Query to know if a user exists, returns BOOLEAN
    var client = new pg.Client(conString);
    client.connect(function(err) {
      if(err) {
        console.error('Could not connect to postgres', err);
        return fn(500,null);
      }
      client.query("SELECT * FROM USERS WHERE USERNAME = '"+username+"'", function(err, result) {
        if(err) {
          console.error('Error running query', err);
          return fn(400,null);
        }
        client.end();
        return fn(null,result.rows[0] !== undefined);

      });
    });
  },

  insertUser: function(User, fn) {
    db.userExists(User.getUsername(), function(err,res){
      // Query to get user's password (hashed) and salt
      if (err)
        return fn(err,null);
      if (res) {
        var err = new Error("Username already taken");
        err.http_code = 400;
        return fn(err,null);
      }else{
        var client = new pg.Client(conString);
        client.connect(function(err) {
          if(err) {
            console.error('Could not connect to postgres', err);
            var err = new Error("Could not connect to postgres");
            err.http_code = 500;
            return fn(err,null);
          }
          client.query("INSERT INTO USERS (USERNAME,PASSWORD,SALT) VALUES ('"+User.getUsername()+"','"+User.getPassword()+"','"+User.getSalt()+"')", function(err, result) {
            if(err) {
              console.error('Error running query', err);
              var err = new Error("Error running query");
              err.http_code = 400;
              return fn(err,null);
            }
            client.end();

            return fn(null, res);
          });
        });
      }
    });
  }

}

module.exports = db;
