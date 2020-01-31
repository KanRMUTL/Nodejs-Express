var express = require('express')
var path = require('path')
var app = express()

app.set('view engine', 'ejs')
app.set('views', './public')

app.get('/', function(req, res){
    res.render('ejs', {
        header: 'This is header',
        friends: ['art', 'best', 'kim']
    })
})

var server = app.listen(3000, function(){
    console.log('server is running on localhost:3000')
})