var https = require('https'),
    http = require('http'),
    util = require('util'),
    colors = require('colors'),
    httpProxy = require('http-proxy'),
    helpers = require('http-proxy/test/helpers'),
    fs = require('fs');
    
//
// Create the target HTTPS server 
//
//console.log(helpers.https);

var HTTPS = helpers.https;
/*{
   key: fs.readFileSync('cert/google.key.pem', 'utf8'),
   cert: fs.readFileSync('cert/google.cert.pem', 'utf8'),
};*/

https.createServer(HTTPS, function (req, res) {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.write('hello https\n');
	res.end();
}).listen(8000);

//
// Create the proxy server listening on port 443
//

//httpProxy.createServer(443, 'www.facebook.com', {
httpProxy.createServer(443, 'drive.google.com', 
//httpProxy.createServer(8000, 'localhost', 
  function (req, res, next) {
    var _write = res.write;
    res.write = function (data) {
      console.log(data);
      console.log("----------\n");
      console.log(data.toString());
      _write.call(res, new Buffer(data.toString()));//data.toString().replace("https://drive.google.com/", "/"));
    }
    next();
  },{
  https: HTTPS,
  target: {
    https: true,
    rejectUnauthorized: false,
    changeOrigin: true
  },
  changeOrigin: true
}).listen(9778, function(e){
	console.log(e);
});;

