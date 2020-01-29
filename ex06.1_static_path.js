var express = require('express')
var path = require('path')
var app = express()
var basePath = path.join(__dirname, '/public')

app.use(express.static(basePath))


const server = app.listen(3000, () => {
    var host = server.address().address
    var port = server.address().port
    console.log('Listening at %s:%s', host, port)
})