const {URL} = require('./config')

const puppeteer = require('puppeteer');
const https = require('https');
const fs = require('fs');

const { jsPDF } = require("jspdf");

const doc = new jsPDF({
  orientation: "p",
  unit: "mm",
  format: custom
});

(async () => {

  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(URL);

  const imageList = await page.evaluate(() => {
    const mangaPages = document.querySelectorAll('.read-slideshow img')

    const nodeList = [...mangaPages]
    
    const list = nodeList.map(({src}) => ({
      src
    }))

    return list
  })

  await imageList.map((item, id) => {
    https.get(item.src, (res) => {
      if(res) {
        const file = fs.createWriteStream(`file-${id}.png`)
        res.pipe(file)
      }

    })
  })

  doc.save()

  // console.log(imageList)
  // await browser.close();
})();