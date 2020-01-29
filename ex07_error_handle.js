var express = require('express')
var path = require('path')
var app = express()

app.get('/profile', (req, res) => {
    res.end('Profile page')
})

app.use((req, res, error) => {
    res.sendFile(path.join(__dirname, 'public/page_not_found.html'))
})

const server = app.listen(3000, () => {
    var host = server.address().address
    var port = server.address().port
    console.log(`Listening at http://${host}:${port}`)
})