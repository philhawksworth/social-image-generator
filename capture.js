const axios     = require('axios');
const puppeteer = require('puppeteer');


/*
* Global config variables
*/
const conf = {
  path: './dist/card',
  index: 'https://social-images--hawksworx.netlify.com/card-urls.json'
}


/*
* Take a snapshot with puppeteer
*/
async function snap(url, file) {
  try {
    console.log('snapping :', url);
    let browser = await puppeteer.launch({ headless: true });
    let page = await browser.newPage();
    await page.setViewport({ width: 1024, height: 512 });
    await page.goto(url);
    await page.screenshot({ path: file, type: 'png' });
    await browser.close();
    console.log('snapped :', file);
  }
  catch (err) {
    console.log('err :', err);
  }
}


/*
* Discover the list of urls for which we need snapshots
*/
axios.get(conf.index)
  .then((response) => {
    response.data.cards.forEach( (url) => {
      let re = /\//gi;
      let filename = url.split("://")[1].replace(re,".");
      let path = `${conf.path}/${filename}.png`
      snap(url, path);
    });
  })
  .catch((error) => {
    console.log('error :', error)
  });
