var express = require('express')
var path = require('path')
var app = express()

app.set('view engine', 'ejs')
app.set('views', './adminlte')
app.use(express.static(path.join(__dirname, './adminlte')))

app.get('/', function(req, res){
   res.render('index', {
       title: 'Kiadtisak   Lowongsa'
   })
})

var server = app.listen(3000, function(){
    console.log('server is running on localhost:3000')
})