const path = require('path')
const fs = require('fs')
const express = require('express')
const camelcase = require('camelcase')
const { fork } = require('child_process')
const CACHE = path.resolve(__dirname, 'cache')
const app = express()

const prerenderer = fork(path.resolve(__dirname, 'ssr.js'))

app.use(express.static('build'))
app.use('/static', express.static('static'))
app.use((req, res, next) => {
  if (req.query.robot) {
    return next()
  }

  prerenderer.send(req.path)
  next()
})

app.get('/blog/posts.json', (req, res) => {
  const POST_PATH = path.resolve(__dirname, 'static/docs')
  const posts = fs.readdirSync(POST_PATH)
  const result = []

  for (const post of posts) {
    const md = fs.readFileSync(path.resolve(POST_PATH, post)).toString('utf-8')
    const [_, rawMeta] = md.split('---') //eslint-disable-line
    const metaItems = rawMeta.split('\n')
    const meta = {}

    for (const item of metaItems) {
      if (!item.includes(':')) {
        continue
      }

      const [key, ...value] = item.split(':')
      meta[camelcase(key).trim()] = value.join(':').trim()
    }

    if (meta.published !== 'true') {
      continue
    }

    const [year, month, day, ...url] = post.replace('.md', '').split('-')
    meta.url = `${year}/${month}/${day}/${url.join('-')}`
    result.push(meta)
  }

  res.send(result)
})

const getFileName = p => {
  const date = new Date()

  return [
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate(),
    p.split('/').join('-')
  ].join('_') + '.html'
}

app.get('*', (req, res) => {
  res.set('Content-Type', 'text/html')

  if (fs.existsSync(path.resolve(CACHE, getFileName(req.path)))) {
    res.send(
      fs.readFileSync(
        path.resolve(CACHE, getFileName(req.path))
      )
    )
    return
  }


  res.send(
    fs.readFileSync(path.resolve(__dirname, 'build', 'shell.html'))
  )
})

app.listen(3000)
