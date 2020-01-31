var express = require('express')
var session = require('express-session')
var app = express()

app.use(session({
    secret: 'kiakdkeidkc', 
    cookie: {
        maxAge: 50000000
    },
    resave: true,
    saveUninitialized: false
}))

app.get('/count', function(req, res){
    if(req.session.count == null) {
        req.session.count = 0
    }
    req.session.count += 1
    res.end('count: ' + req.session.count)
})

app.get('/reset', function(req, res){
    req.session.destroy()
    res.redirect('/count')
})

var server = app.listen(3000, function(){
    console.log('server is running on localhost:3000')
})