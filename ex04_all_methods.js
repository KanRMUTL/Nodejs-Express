var express = require('express')
var bodyParser = require('body-parser')
var app = express()

app.use(bodyParser({
    extended: false
}))

app.all('/secured/*', (req, res, next) => {
    if(req.body.username == 'kan' && req.body.password == '1234') {
        next()
    } else {
        res.json({ result: 'login fail'})
    }
})

app.get('/secured/login', (req, res) => {
    res.json({message: 'Login success!!'})
})

const server = app.listen(3000, () => {
    var host = server.address().address
    var port = server.address().port
    console.log('Listening at %s:%s', host, port)
})