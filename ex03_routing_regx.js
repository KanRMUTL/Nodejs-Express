var express = require('express')
var bodyParser = require('body-parser')
var app = express()

app.get('/ab?cd', (req, res) => {
    res.end('ab?cd routing')
})

app.get('/ab?cd', (req, res) => {
    res.end('ab?cd routing')
})

app.get('/ka+n', (req, res) => {
    res.end('ka+n routing')
})

app.get('/a*z', (req, res) => {
    res.end('a*z routing')
})

const server = app.listen(3000, () => {
    var host = server.address().address
    var port = server.address().port
    console.log('Listening at %s:%s', host, port)
})