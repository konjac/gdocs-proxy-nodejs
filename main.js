var util = require('util'),
    colors = require('colors'),
    http = require('http'),
    https = require('https'),
    httpProxy = require('http-proxy'),
    helpers = require('http-proxy/test/helpers');

//var PORT = 9778;
var PORT = process.env.PORT;

//
// Basic Http Proxy Server
//
httpProxy.createServer(
  443, 'drive.google.com',
  function (req, res, next) {
    var _write = res.write;
    res.write = function (data) {
       data = data.toString();
       data = data.replace(/https:\/\/drive.google.com/g, 'http://konjac-proxy.herokuapp.com');
       //data = data.replace(/http:\/\/drive.google.com/g, 'http://konjac.cloudapp.net:9779');
       _write.call(res, data);
    }
    next();
  },{
      //https: helpers.https,
      target: {
         https: true,
         rejectUnauthorized: false,
         changeOrigin: true
      },
      changeOrigin: true
  }
).listen(PORT);

console.log("Server is listening to " + PORT + "\n");
