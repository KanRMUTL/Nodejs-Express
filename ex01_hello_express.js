var express = require('express')
var app = express()

app.get('/', (req, res) => {
    res.end('Welcome to express')
})

const server = app.listen(3000, () => {
    var host = server.address().address
    var port = server.address().port
    console.log('Listening at %s:%s', host, port)
})