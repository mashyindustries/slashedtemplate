'use strict'

const execSync = require('child_process').execSync
const path = require('path')

module.exports = function letsEncrypt(app, isMaster){
    var keyPath
    var certPath

    var sslconf = app.get('ssl')

    var command = ""

    function getCPath(file){
        return path.resolve(app.get(sslconf.certDir), sslconf[file])
    }

    execSync('certbot certonly --standalone'
    + '--cert-path "' + getCPath('cert')
    + '" --key-path "' + getCPath('privatekey')
    + '" --chain-path "' + getCPath('chain')
    + '" --fullchain-path "' + getCPath('fullchain') + '" --staging')

    let options = {
        key: keyPath,
        cert: certPath
    }
    console.log(options)
    return options
}