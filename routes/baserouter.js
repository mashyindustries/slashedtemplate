'use strict'

var router = require('slashed').Router()

router.get('/', function(req, res){
    res.send('Hello World')
})

module.exports = router