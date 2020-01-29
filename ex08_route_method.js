var express = require('express')
var app = express()

app.route('/user')
    .get((req, res) => {
        res.end('get user')
    })
    .post((req, res) => {
        res.end('add user')
    })
    .put((req, res) => {
        res.end('update user')
    })
    .patch((req, res) => {
        res.end('patch user')
    })
    .delete((req, res) => {
        res.end('delete user')
    })

app.listen(3000, () => {
    console.log('Server runing in http://localhost:3000')
})