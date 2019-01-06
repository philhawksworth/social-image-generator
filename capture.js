const puppeteer = require('puppeteer');


// temp... for dev time.
const urls = [
  'https://www.hawksworx.com/blog',
  'https://www.hawksworx.com/about',
  'https://www.hawksworx.com/speaking',
  'https://www.hawksworx.com'
];


const conf = {
  path: './dist/card',
  index: 'https://www.hawksworx.com/card-urls.json'
}

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

urls.forEach( (url) => {
  let filename = url.split("://")[1].replace("/",".");
  let path = `${conf.path}/${filename}.png`
  snap(url, path);
});

