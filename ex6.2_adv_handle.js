var express = require('express')
var app = express()

app.get('/login/:username/:password', (req, res, next) => {
    if (req.params.username == 'kan') {
        next()
    } else {
        res.end('username invalid')
    }
}, (req, res, next) => {
    if (req.params.password == '1234') {
        next()
    } else {
        res.end('password invalid')
    }
}, (req, res) => {
    res.json({
        result: 'login success!!',
        username: req.params.username,
        password: req.params.password
    })
})

var checkUsername = (req, res, next) => {
    if (req.params.username == 'kan') {
        next()
    } else {
        res.end('username invalid')
    }
}

var checkPassword = (req, res, next) => {
    if (req.params.password == '1234') {
        next()
    } else {
        res.end('password invalid')
    }
}

app.get('/loginv2/:username/:password', checkUsername, checkPassword, (req, res) => {
    res.json({
        result: 'login success!!',
        username: req.params.username,
        password: req.params.password
    })
})

const server = app.listen(3000, () => {
    var host = server.address().address
    var port = server.address().port
    console.log('Listening at %s:%s', host, port)
})