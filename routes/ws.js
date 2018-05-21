'use strict'

var router = require('slashed').Router()

router.ws('/test', function(ws, req){
    ws.on('message', function(msg) {
        console.log('test ws message', msg)
    })
});

module.exports = router
