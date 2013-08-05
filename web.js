var https = require('https'),
    http = require('http'),
    util = require('util'),
    colors = require('colors'),
    httpProxy = require('http-proxy'),
    helpers = require('http-proxy/test/helpers');
    
//
// Create the target HTTPS server 
//
https.createServer(helpers.https, function (req, res) {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.write('hello https\n');
	res.end();
}).listen(8000);

//
// Create the proxy server listening on port 443
//
httpProxy.createServer(433, 'docs.google.com', {
//httpProxy.createServer(8000, 'localhost', {
  https: helpers.https,
  target: {
    https: true,
    rejectUnauthorized: false
  }
}).listen(9778);

util.puts('https proxy server'.blue + ' started '.green.bold + 'on port '.blue + '8080'.yellow);
util.puts('https server '.blue + 'started '.green.bold + 'on port '.blue + '8000 '.yellow);
