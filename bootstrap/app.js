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

    cluster.on('exit', function (worker) {
        console.log(colors.blue('Worker: ') + worker.id + " died, forking a new one")
        cluster.fork()
        
    })

    for (var i = 0; i < cpuCount; i += 1) {
        cluster.fork()
    }

}else{
    console.log(colors.blue('Worker: ') + cluster.worker.id + " Running")

    //create app
    var basedir = path.resolve(__dirname, '..')
    var app = slashed(basedir)
    var router = require(app.get('path:routes/baserouter.js'))
    router.use(serveStatic(app.get('path:public')))
    app.use(router)

    //create server
    let options

    app.listen(process.env.NODE_ENV === 'production' ? 80 : 3000); // avoiding 'EACCESS' error

    if(os.platform() == 'linux'){
        options = {
            key: fs.readFileSync("/etc/letsencrypt/live/" + app.get('app.domain') + "/privkey.pem"),
            cert: fs.readFileSync("/etc/letsencrypt/live/" + app.get('app.domain') + "/fullchain.pem")
        }
    }
    if(options){ //TODO: handle https
        https.createServer(options, app).listen(443)
    }
}

