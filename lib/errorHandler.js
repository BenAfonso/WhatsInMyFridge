exports.handler = function(err,res){
    res.status(err.http_code);
    res.json({
      "status": err.http_code,
      "message": err.message
    });
}
