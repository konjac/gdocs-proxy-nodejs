/*
  forward-proxy.js: Example of proxying over HTTP with additional forward proxy

  Copyright (c) 2010 Charlie Robbins, Mikeal Rogers, Fedor Indutny, & Marak Squires.

  Permission is hereby granted, free of charge, to any person obtaining
  a copy of this software and associated documentation files (the
  "Software"), to deal in the Software without restriction, including
  without limitation the rights to use, copy, modify, merge, publish,
  distribute, sublicense, and/or sell copies of the Software, and to
  permit persons to whom the Software is furnished to do so, subject to
  the following conditions:

  The above copyright notice and this permission notice shall be
  included in all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
  NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
  LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
  OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
  WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

*/

var util = require('util'),
    colors = require('colors'),
    http = require('http'),
    httpProxy = require('http-proxy'),
    helpers = require('http-proxy/test/helpers');
    https = require('https');

//
// Setup proxy server with forwarding
//
//httpProxy.createServer(9000, 'localhost', {
httpProxy.createServer(80, 'docs.google.com', {
  forward: {
    port: 9001,
    host: 'localhost'
  },
  changeOrigin: true
}).listen(9778);

/*
httpProxy.createServer(9000, 'localhost', {
//httpProxy.createServer(433, 'docs.google.com', {
  https: helpers.https,
  changeOrigin: true,
  forward:{
      https: true,
      port: 9001,
      host: 'localhost'
  },
  target:{
      https: true,
      rejectUnauthorized: false
  }
}).listen(9778);
*/

//
// Target Http Server
//
http.createServer(function (req, res) {
  util.puts( JSON.stringify(req.headers, true, 2).red );
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.write('request successfully proxied to: ' + req.url + '\n' + JSON.stringify(req.headers, true, 2));
  res.end();
}).listen(9000);

//
// Target Http Forwarding Server
//
http.createServer(function (req, res) {
//  util.puts( JSON.stringify(req.headers, true, 2) );
  util.puts('Receiving forward for: ' + req.url);
  util.puts( JSON.stringify(req.headers, true, 2).green );
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.write('request successfully forwarded to: ' + req.url + '\n' + JSON.stringify(req.headers, true, 2));
  res.end();
}).listen(9001);

