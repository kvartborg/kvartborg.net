const fs = require('fs')
const { resolve } = require('path')
const puppeteer = require('puppeteer')
const CACHE = resolve('./cache')
const BASE_URL = process.env.NODE_ENV === 'production' ? 'https://kvartborg.net' : 'http://localhost:3000'

if (!fs.existsSync(CACHE)) {
  fs.mkdirSync(CACHE)
}

process.on('message', path => {
  run(path)
})

const getFileName = path => {
  const date = new Date()

  return [
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate(),
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
    await page.waitFor(4000)
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
