const path = require('path')
const fs = require('fs')
const express = require('express')
const app = express()

app.use(express.static('static'))
app.use('/blog', express.static('blog'))

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'shell.html'))
})

app.listen(3000)
