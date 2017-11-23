'use strict'

var serveStatic = require('serve-static')
var slashed = require('slashed')
var cluster = require('cluster')
var https = require('https')
var http = require('http')
var path = require('path')
var os = require('os')

if(cluster.isMaster){
    let options
    var cpuCount = os.cpus().length

    var basedir = path.resolve(__dirname, '..')
    var app = slashed(basedir)
    app.use(serveStatic(app.get('path:public')))

    cluster.on('exit', function (worker) {
        console.log(colors.blue('Worker: ') + worker.id + " died, forking a new one")
        cluster.fork()
        
    })

    //if(os.platform() == 'linux'){
        require('../ssl/letsencrypt/letsencrypt')(app, true)
    //}

    //gulp

    for (var i = 0; i < cpuCount; i += 1) {
        cluster.fork()
    }

}else{
    let options
    console.log(colors.blue('Worker: ') + cluster.worker.id + " Running")
    
    var basedir = path.resolve(__dirname, '..')
    var app = slashed(basedir)
    var router = require(path.resolve(basedir, 'routes/baserouter.js'))
    router.use(serveStatic(app.get('path:public')))
    app.use(router)

    http.createServer(app).listen(80)
    if(os.platform() == 'linux'){
        options = require('../ssl/letsencrypt/letsencrypt')(app)
    }
    if(options){
        https.createServer(options, app).listen(443)
    }
}

