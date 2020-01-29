var express = require('express')
var router = require('./ex09_export_router')
var app = express()

app.use('/api', router)

const server = app.listen(3000, () => {
    var host = server.address().address
    var port = server.address().port
    console.log('Listening at %s:%s', host, port)
})