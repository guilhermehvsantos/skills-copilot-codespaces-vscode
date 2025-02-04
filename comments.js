// Create web server
var http = require('http');
var url = require('url');
var fs = require('fs');
var path = require('path');

var server = http.createServer(function(req, res) {
  var url_parts = url.parse(req.url);

  if (url_parts.pathname == '/') {
    fs.readFile('./index.html', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      res.end();
    });
  } else if (url_parts.pathname == '/comments') {
    if (req.method == 'POST') {
      var body = '';
      req.on('data', function(data) {
        body += data;
      });
      req.on('end', function() {
        fs.appendFile('comments.txt', body + '\n', function(err) {
          res.writeHead(200, {'Content-Type': 'text/plain'});
          res.end('Comment saved');
        });
      });
    } else if (req.method == 'GET') {
      fs.readFile('comments.txt', function(err, data) {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.write(data);
        res.end();
      });
    } else {
      res.writeHead(501, {'Content-Type': 'text/plain'});
      res.end('Invalid request method');
    }
  } else {
    res.writeHead(404, {'Content-Type': 'text/plain'});
    res.end('Page not found');
  }
});

server.listen(8080);
console.log('Server running at http://localhost:8080/');
