const {URL} = require('./config')

const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {

  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(URL);

  await page.evaluate(() => {
    const mangaPages = document.querySelectorAll('.read-slideshow img')

    const nodeList = [...mangaPages]
    
     nodeList.map(({src}) => {
        console.log(src)
    })

  })
//   await browser.close();
})();