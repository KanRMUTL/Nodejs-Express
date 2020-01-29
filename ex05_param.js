var express = require('express')
var app = express()

app.get('/login/username/:username/password/:password', function(req, res){
    res.json({
        username: req.params.username,
        password: req.params.password
    })
})

app.get('/adventure/:from-:to', (req, res)=>{
    let {from, to} = req.params
    res.json({
        form: from,
        to: to
    })
})

const server = app.listen(3000, () => {
    var host = server.address().address
    var port = server.address().port
    console.log('Listening at %s:%s', host, port)
})