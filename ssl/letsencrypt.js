'use strict'

const execSync = require('child_process').execSync
var serveStatic = require('serve-static')
const rawacme = require("rawacme")
var slashed = require('slashed')
var path = require('path')
var pem = require('pem')
var fs = require('fs')

var basedir = path.resolve(__dirname)
var app = slashed(basedir)

let privateKey
let publicKey

try{
    privateKey = fs.readFileSync(path.resolve(__dirname, 'keys/private.pem'))
    publicKey = fs.readFileSync(path.resolve(__dirname, 'keys/public.pem'))
}catch(e){
    privateKey = String(execSync('openssl genrsa 2048'))
    fs.writeFileSync(path.resolve(__dirname,'keys/private.pem'), privateKey)
    publicKey = String(execSync('openssl rsa -in ' + path.resolve(__dirname, 'keys/private.pem') + ' -pubout' ))
    fs.writeFileSync(path.resolve(__dirname,'keys/public.pem'), publicKey)
}



let client = new LEClient(privateKey)

client.register().then(() => {
    console.log("Registered Successfully")
})

//app.get(challenge)