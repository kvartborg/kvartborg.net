const fs = require('fs')
const { resolve } = require('path')
const puppeteer = require('puppeteer')
const camelcase = require('camelcase')
const CACHE = resolve('./cache')
const BASE_URL = process.env.NODE_ENV === 'production' ? 'https://quartercastle.com' : 'http://localhost:3000'

const paths = [
  '/',
  '/posts',
  '/work',
  ...getPosts(),
]

if (!fs.existsSync(CACHE)) {
  fs.mkdirSync(CACHE)
}

const getFileName = path => {
  const date = new Date()

  return [
    path.split('/').join('-')
  ].join('_') + '.html'
}

const run = async path => {
  if (path.includes('.')) {
    return
  }

  if (fs.existsSync(resolve(CACHE, getFileName(path)))) {
    return
  }

  try {
    const browser = await puppeteer.launch({
      // executablePath: '/usr/bin/chromium-browser',
      args: ['--disable-dev-shm-usage', '--no-sandbox']
    })

    const page = await browser.newPage()
    await page.goto(BASE_URL + path + '?robot=true', { waitUntil: 'networkidle0' })
    await page.waitFor(6000)
    await page.evaluate(() => {
      const el = document.querySelector('#root');
      document.querySelector('noscript').appendChild(el.cloneNode(true))

      for (const child of el.children) el.removeChild(child)
    })
    const html = await page.content()


    fs.writeFileSync(
      resolve(CACHE, getFileName(path, html)),
      html
    )

    await browser.close();
  } catch (err) {
    console.log(err.message)
  }
}

function getPosts() {
  const POST_PATH = resolve(__dirname, 'static/docs')
  const posts = fs.readdirSync(POST_PATH)
  const result = []

  for (const post of posts) {
    const md = fs.readFileSync(resolve(POST_PATH, post)).toString('utf-8')
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
    result.push('/post/'+meta.url)
  }

  return result
}

for (const path of paths) {
  run(path)
}
