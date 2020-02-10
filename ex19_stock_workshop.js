var express = require('express')
var formidable = require('formidable')
var path = require('path')

var app = express()
var basePath = path.join(__dirname, '/stock')

app.set('view engine', 'ejs')
app.set('views', './stock')
app.use(express.static(basePath))

app.get('/', function (res, req) {
    var productDummy = []
    for(let i = 0; i < 90; i++){
        productDummy.push({
            id: 1,
            img: 'poster.jpg',
            title: 'Web Development',
            description: 'Course descript',
            price: 50000,
            stock: 255
        })
    }
    req.render('index', {
        header: 'Stock Workshop',
        products: productDummy
    })
})



var server = app.listen(3000, function () {
    console.log('server is running on localhost:3000')
})