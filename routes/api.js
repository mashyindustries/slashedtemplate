'use strict'

var router = require('slashed').Router()
var bodyParser = require('body-parser')

router.use(bodyParser.json())
router.get('/', function(req, res){
    res.send({"Hello World": "This is the API Endpoint"})
})

router.post('/dopost', function(req, res){
    res.send('ok')
})

module.exports = router