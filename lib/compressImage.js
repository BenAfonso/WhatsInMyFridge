var request = require('request');

// This functions calls a distant API to compress a given img url and returns
// a compressed image using http://api.resmush.it
exports.compress = function(img, fn){
  var options = {
  host: 'http://api.resmush.it',
  path: '/ws.php?img='+img
};
  if (img !== undefined){
    request.post({url:'http://api.resmush.it/ws.php', form: {img:img}},
     function(err,httpResponse,body){
       if (err){
         return fn(err);
       }
       result = JSON.parse(body).dest;
       if (result !== undefined){
         console.log("An image has been compressed successfully");
         return fn(null,result);
       }else{
         var err = new Error("Image compressing failed");
         return fn(err);
       }
     });

   }else{
     var err = new Error("No image submitted, next =>");
     return fn(err);
   }

}
