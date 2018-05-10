'use strict'

var serveStatic = require('serve-static')
var router = require('slashed').Router()
var webRoutes = require('./web.js')
var wsRoutes = require('./ws.js')
var apiRoutes = require('./api.js')

var staticMiddleware = serveStatic(slashed.config.get('path:public'))

router.use(staticMiddleware)
router.use('/api', apiRoutes)
router.use(webRoutes)
router.use(wsRoutes)

module.exports = router