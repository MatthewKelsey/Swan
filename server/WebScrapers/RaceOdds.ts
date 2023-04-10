import puppeteer, { Browser, Page } from "puppeteer";

interface HorseObject {
  horseName: string;
  odds: string;
}

export async function scrapeHorseRacingOdds(url: string): Promise<string> {
  const browser = await puppeteer.launch({ headless: true});
  const page = await browser.newPage();
  await page.goto(url);

  await page.waitForSelector(".runner-name-value");

  const horseNames = await page.$$eval("tbody .runner-name-value", (elements) =>
    elements.map((el) => el.textContent?.trim())
  );

  const horseOdds = await page.$$eval("tbody span.ui-runner-price", (prices) =>
    prices.map((price) => price.textContent || "")
  );

  const mergedData: HorseObject[] = horseNames.map((name, i) => ({
    horseName: name || "",
    odds: horseOdds[i] || "",
  }));

  await browser.close();

  return JSON.stringify(mergedData);
}

export interface RaceInfo {
  eventUrl: string;
  event: string;
}

export async function scrapeHorseRaces(url: string): Promise<string> {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://www.betfair.com/sport/horse-racing");

  const links = await page.$$(".races-window .ui-nav.ui-gtm-click");
  const raceInfoList: RaceInfo[] = [];

  for (const link of links) {
    const href = await link.evaluate((node) => node.getAttribute("href"));
    const raceName = await link.evaluate((node) =>
      node.getAttribute("data-galabel")
    );

    if (
      raceName &&
      raceName.match(/\d+/) &&
      !raceName.includes("view full race card")
    ) {
      const infoObj: RaceInfo = {
        eventUrl: href || "",
        event: raceName,
      };

      raceInfoList.push(infoObj);
    }
  }
  await browser.close();
  return JSON.stringify(raceInfoList);
}
// scrapeHorseRaces('https://www.betfair.com/sport/horse-racing')
// scrapeHorseRaces(horseRacesUrl).then((data: string) => console.log(data));
