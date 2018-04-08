const path = require('path')
const fs = require('fs')
const express = require('express')
const app = express()

const shell = () => {
  const bundles = fs.readdirSync(path.resolve(__dirname, 'static/build'))
  const bundle = bundles.find(b => b.includes('main'))
  return fs.readFileSync(path.resolve(__dirname, 'shell.html'))
    .toString()
    .replace('{bundle}', bundle)
}

app.use(express.static('static'))
app.use('/blog', express.static('blog'))

app.get('*', (req, res) => {
  res.set('Content-Type', 'text/html')
  res.send(shell())
})

app.listen(3000)
