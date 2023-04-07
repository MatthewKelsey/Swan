import puppeteer, { Browser, Page } from "puppeteer";

interface HorseObject {
  horseName: string;
  odds: string;
}

export async function scrapeHorseRacingOdds(url: string): Promise<string> {
  const browser = await puppeteer.launch({ headless: false });
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

interface Race {
  time: string;
  venue: string;
}

export async function scrapeHorseRaces(url: string): Promise<string> {
  const browser: Browser = await puppeteer.launch({ headless: false });
  const page: Page = await browser.newPage();
  await page.goto(url);

  await page.waitForSelector(".slot.race-item");

  const races: string[][] = await page.$$eval(
    ".slot.race-item",
    (elements: Element[]) =>
      elements.map((el) =>
        el.textContent?.trim().split("\n").map((item) => item.trim()) as string[]
      ).filter((arr) => arr !== undefined)
  ) ;
  

  const racesArray: Race[] = races.map((race) => ({
    time: race[0],
    venue: race[1],
  }));

  await browser.close();

  return JSON.stringify(racesArray);
}

const horseRacesUrl = "https://www.betfair.com/sport/horse-racing";

// scrapeHorseRaces(horseRacesUrl).then((data: string) => console.log(data));
