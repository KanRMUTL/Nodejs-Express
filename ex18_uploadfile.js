var express = require('express')
var formidable = require('formidable')
var path = require('path')
var app = express()
var fs = require('fs')

app.use(express.static(path.join(__dirname, './upload')))

app.post('/upload', function (req, res) {
    try {
        var form = new formidable.IncomingForm()
        form.parse(req, function (err, fields, files) { // check request
            var oldPath = files.flietoupload.path
            var newPath = path.join(__dirname, './upload/' + files.flietoupload.name)
            fs.rename(oldPath, newPath, function (err) {
               
                res.end()
            })

        })
    } catch (err) {
        console.log(err)
        res.send(err)
    }
})

var server = app.listen(3000, function () {
    console.log('server is running on localhost:3000')
})