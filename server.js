const path = require('path')
const fs = require('fs')
const express = require('express')
const camelcase = require('camelcase')
const app = express()

app.use(express.static('build'))
app.use('/static', express.static('static'))

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

    meta.url = post.replace('.md', '')
    result.push(meta)
  }

  res.send(result)
})

app.get('*', (req, res) => {
  res.set('Content-Type', 'text/html')
  res.send(
    fs.readFileSync(path.resolve(__dirname, 'build', 'shell.html'))
  )
})

app.listen(3000)
