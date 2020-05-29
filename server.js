const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const staticMiddleware = require('express').static

// serve content out of 'public' as is
server.use(staticMiddleware('public'))

server.use('/api', router)

server.listen(3000, () => {
    console.log('JSON Server is running')
});

var express = require('express');
var app = express();

// prepare server
app.use('/api', api); // redirect API calls
app.use('/', express.static(__dirname + '/www')); // redirect root
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect bootstrap JS
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist')); // redirect JS jQuery
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); // redirect CSS bootstrap