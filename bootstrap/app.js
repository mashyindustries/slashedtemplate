'use strict'

var serveStatic = require('serve-static')
var slashed = require('slashed')
var cluster = require('cluster')
var path = require('path')

if(cluster.isMaster){
    var cpuCount = require('os').cpus().length

    cluster.on('exit', function (worker) {
        console.log(colors.blue('Worker: ') + worker.id + " died, forking a new one")
        cluster.fork()
        
    })
    var letsencrypt = require('../ssl/letsencrypt')
    //gulp
    for (var i = 0; i < cpuCount; i += 1) {
        cluster.fork()
    }

}else{
    console.log(colors.blue('Worker: ') + cluster.worker.id + " Running")

    var basedir = path.resolve(__dirname, '..')
    var app = slashed(basedir)
    var router = require(path.resolve(basedir, 'routes/baserouter.js'))
    router.use(serveStatic(app.get('path:public')))
    app.use(router)
}

