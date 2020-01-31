var express = require('express')
var bodyParser = require('body-parser')
var path = require('path')
var app = express()

app.use(bodyParser.urlencoded({extended: false}))

app.get('/*', function(req, res){
    res.sendFile(path.join(__dirname, 'public/register.html'))
})

app.post('/register', function(req, res){
    res.json({
        name: req.body.name,
        age: req.body.age,
        sex: req.body.sex
    })
})

var server = app.listen(3000, function(){
    console.log('server is running on localhost:3000')
})