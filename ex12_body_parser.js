var express = require('express')
var bodyParser = require('body-parser')
var app = express()

app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())

app.post('/login', function (req, res) {
    res.write('Username: ' + req.body.username)
    res.write(' password: ' + req.body.password)
    res.end()
})

var server = app.listen(3000, function(){
    console.log('server is running on localhost:3000')
})