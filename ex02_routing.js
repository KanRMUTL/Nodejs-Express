var express = require('express')
var bodyParser = require('body-parser')
var app = express()

app.use(bodyParser({
    extended: false
}))

app.get('/login/body', (req, res) => {
    res.end('username: ' + req.body.username + ' Password: ' + req.body.password)
})

app.get('/login/query', (req, res) => {
    res.end('username: ' + req.query.username + ' Password: ' + req.query.password)
})

const server = app.listen(3000, () => {
    var host = server.address().address
    var port = server.address().port
    console.log('Listening at %s:%s', host, port)
})