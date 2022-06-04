const PouchDB = require('pouchdb');
const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const cors = require('cors')

let database = PouchDB.defaults({
  prefix: './database/pouchdb/dbs/',
})

express()
  .use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:9000"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Credentials", "true");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  })
  .use(
    express.static(path.join(__dirname, 'public')), 
    require('express-pouchdb')(database, {
      logPath: './database/pouchdb/logs/log.txt',
      configPath: './database/pouchdb/config.json',
    })
  )
  .use(cors())
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
