import puppeteer from 'puppeteer';

interface RaceInfo {
  eventUrl: string;
  event: string;
}

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://www.betfair.com/sport/horse-racing');

  const links = await page.$$('.races-window .ui-nav.ui-gtm-click');
  const raceInfoList: RaceInfo[] = [];

  for (const link of links) {
    const href = await link.evaluate((node) => node.getAttribute('href'));
    const raceName = await link.evaluate((node) => node.getAttribute('data-galabel'));

    if (raceName && raceName.match(/\d+/) && !raceName.includes('view full race card')) {
      const infoObj: RaceInfo = {
        eventUrl: href || '',
        event: raceName,
      };

      raceInfoList.push(infoObj);
      
    }
  }
  await browser.close();
 return JSON.stringify(raceInfoList)
 
})();
