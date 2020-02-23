var express = require('express')
var formidable = require('formidable')
var path = require('path')
var fs = require('fs')

var app = express()
var basePath = path.join(__dirname, '/stock')

app.set('view engine', 'ejs')
app.set('views', './stock')
app.use(express.static(basePath))

app.get('/', function (req, res) {
    var productDummy = []
    for (let i = 0; i < 90; i++) {
        productDummy.push({
            id: 1,
            img: 'poster.jpg',
            title: 'Web Development',
            description: 'Course descript',
            price: 50000,
            stock: 255
        })
    }
    res.render('index', {
        header: 'Stock Workshop',
        products: productDummy
    })
})


app.get('/add', function (req, res) {
    res.render('add', {
        header: 'Create Product'
    })
});

app.post('/api/add', function (req, res) {
    try {
        var form = new formidable.IncomingForm();
        var newName = Date.now();
        form.parse(req, function (err, fields, files) {
            var oldPath = files.fileupload.path;
            var fileName = newName.toString() + "." + files.fileupload.name.split('.').pop();
            var newPath = path.join(__dirname, './stock/img/' + fileName)

            fs.rename(oldPath, newPath, function (error) {
                if(error) throw error;
            })

            var data = {
                title: fields.title,
                description: fields.description,
                price: fields.price,
                stock: fields.stock,
                image: fileName
            };

            console.log('data : ', data)
            res.json(data)
        })
    } catch (error) {
        console.log('Err: ', +error)
        res.json(error)
    }
})


var server = app.listen(3000, function () {
    console.log('server is running on localhost:3000')
})