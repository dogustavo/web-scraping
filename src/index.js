const {URL} = require('./config')

const puppeteer = require('puppeteer');
const fs = require('fs');
const axios = require('axios').default;

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

  imageList.map(item => {
    axios.get(item.src)
        .then(res => {
          if(res) {
          }
        })
        .catch(err => {
          return err
        })
  })


  // console.log(imageList)
  // await browser.close();
})();