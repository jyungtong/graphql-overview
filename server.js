var graphql = require('graphql').graphql
var express = require('express')
var graphQLHTTP = require('express-graphql')
var Schema = require('./todo')
var query = `
  query {
    todo(id: 2) {
      id,
      title,
      completed
    }
  }
`

graphql(Schema, query).then(res => {
  console.log(JSON.stringify(res))
})

var app = express()
  .use('/', graphQLHTTP({ schema: Schema, pretty: true }))
  .listen(8080, err => {
    if (err) throw err
    console.log('server is listening on port 8080')
  })
