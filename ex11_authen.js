var express = require('express')
var app = express()

// load session
const session = require('express-session')
app.use(session({
    secret: 'kanland',
    cookie: {
        maxAge: 12000000
    },
    resave: true,
    saveUninitialized: false
}))

app.get('/login', (req, res) => {
    const _username = req.query.username
    const _password = req.query.password
    const isLogin = req.session.isLogin

    // ตรวจสอบว่า login อยู่แล้ว
    if (isLogin != null && isLogin == true) {
        res.json({
            result: 'Already logged-in',
            username: _username,
            password: _password
        })
        return
    }

    // ตรวจสอบ username และ password
    if (_username == 'admin' && _password == 'wow123wow') {
        req.session.isLogin = true
        req.session.username = _username
        req.session.password = _password
        res.json({
            result: 'Login success',
            username: _username,
            password: _password
        })
    } else {
        req.session.isLogin = false
        res.json({
            result: 'Login fail',
            username: _username,
            password: _password
        })
    }
})

app.get('/', (req, res) => {
    if (req.session.isLogin == true) {
        res.redirect('/profile')
    } else {
        res.redirect('/login')
    }
})

app.get('/profile', (req, res) => {
    if(req.session.isLogin == true) {
        res.end('Profile of : ' + req.session.username)
    } else {
        res.redirect('/login')
    }
})

app.get('/logout', (req, res) => {
    req.session.destroy()
    res.redirect('login')
})

const server = app.listen(3000, () => {
    var host = server.address().address
    var port = server.address().port
    console.log('Listening at %s:%s', host, port)
})