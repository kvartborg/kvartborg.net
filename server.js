const path = require('path')
const fs = require('fs')
const express = require('express')
const app = express()

app.use(express.static('build'))
app.use('/static', express.static('static'))

app.get('*', (req, res) => {
  res.set('Content-Type', 'text/html')
  res.send(
    fs.readFileSync(path.resolve(__dirname, 'build', 'shell.html'))
  )
})

app.listen(3000)
