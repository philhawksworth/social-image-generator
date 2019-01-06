const axios     = require('axios');
const puppeteer = require('puppeteer');
var browser, page;

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
    await page.setViewport({ width: 1024, height: 512 });
    await page.goto(url);
    await page.screenshot({ path: file, type: 'png' });
    console.log('snapped :', file);
  }
  catch (err) {
    console.log('err :', err);
  }
}


async function setupAndProcess(array) {
  browser = await puppeteer.launch({ headless: true });
  page = await browser.newPage();
  for (const url of array) {
    let re = /\/|\./gi;
    let filename = url.split("://")[1].replace(re,"-");
    let path = `${conf.path}/${filename}.png`
    await snap(url, path);
  }
  browser.close();
  console.log('Done!');
}


/*
* Discover the list of urls for which we need snapshots
*/

axios.get(conf.index)
  .then((response) => {
    setupAndProcess(response.data.cards);
  })
  .catch((error) => {
    console.log('error :', error)
  });
