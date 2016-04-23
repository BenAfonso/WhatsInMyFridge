var clc = require('cli-color');

exports.handler = function(err,res){
    console.log(clc.red("[-] A "+err.http_code+" error occured: "+err.message));
    res.status(err.http_code);
    res.json({
      "status": err.http_code,
      "message": err.message
    });
}
