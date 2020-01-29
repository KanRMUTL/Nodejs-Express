var express = require('express')
var path = require('path')
var app = express()

app.use(express.static(path.join(__dirname, '/public')))

app.get('/download', (req, res) => {
    res.download(path.join(__dirname, '/public/images/img.jpg'))
})

app.get('/send', (req, res) => {
    res.send('Yaw!! send method')
})

app.get('/end', (req, res) => {
    res.write('This is end method | ')
    res.write('Processing | ')
    res.end('End process')
})

app.get('/json', (req, res) => {
    let data = {
        result: 'okay',
        message: 'request has process'
    }
    res.json(data)
})

app.get('/tojson', (req, res) => {
    res.redirect('/json')
})

app.get('/sendfile', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
})

const server = app.listen(3000, () => {
    var host = server.address().address
    var port = server.address().port
    console.log('Listening at %s:%s', host, port)
})