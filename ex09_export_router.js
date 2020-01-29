var express = require('express')
var router = express.Router()

router.route('/user')
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

module.exports = router