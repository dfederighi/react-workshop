/*eslint-disable no-console */
////////////////////////////////////////////////////////////////////////////////
// Exercise
//
// First, fire up the server:
//
// 1. run `node_modules/.bin/babel-node subjects/ServerRendering/server.js`
//    from the root of this repository
// 2. open http://localhost:5000 (not the typical 8080)
// 3. You will need to restart the server every time you change a file, sorry.
//    (or feel free to make `supervisor -- -r 'babel/register' server.js` to work)
//
// Now let's write some code:
//
// 1. In this file, inside of `createServer`, render `App` with the contacts
//    as a prop, you can use `fetchContacts` to request them. Visit the page
//    to see it render server-side only.
//
// 2. Now that you've got the server working, open up `exercise.js`
////////////////////////////////////////////////////////////////////////////////
import http from 'http'
import React from 'react'
import App from './lib/App'
import fetchContacts from './lib/fetchContacts'

const webpackServer = 'http://localhost:8080'

function write(res, string) {
  res.writeHead(200, {
    'Content-Length': string.length,
    'Content-Type': 'text/html'
  })
  res.write(string)
  res.end()
}

function createPage(appHTML, data) {
  return `
  <!doctype html>
  <html>
    <head>
      <meta charset="utf-8"/>
      <title>My Universal App</title>
    </head>
    <body>

      <div id="app">${appHTML}</div>
      <script>const __DATA__ = ${JSON.stringify(data)};</script>

      <script src=${webpackServer + '/__build__/shared.js'}></script>
      <script src=${webpackServer + '/__build__/19-server-rendering-exercise.js'}></script>
    </body>
  </html>
  `
}

const app = http.createServer(function (req, res) {
  // fetch data and render `App` here,
  // you'll use `fetchContacts`, `App`, and `createPage`
  write(res, '[fill in with the react app]')
})

app.listen(5000)
console.log('listening on port 5000')