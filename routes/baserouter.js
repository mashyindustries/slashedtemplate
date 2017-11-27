'use strict'

var router = require('slashed').Router()

router.get('/', function(req, res){
    res.render('pages.home')
})

module.exports = router