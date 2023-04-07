import puppeteer, { Browser, Page } from "puppeteer";

interface Race {
  time: string;
  venue: string;
}

async function scrapeHorseRaces(url: string): Promise<string> {
  const browser: Browser = await puppeteer.launch({ headless: false });
  const page: Page = await browser.newPage();
  await page.goto(url);

  await page.waitForSelector(".slot.race-item");

  const races: string[][] = await page.$$eval(
    ".slot.race-item",
    (elements: Element[]) =>
      elements.map((el) =>
        el.textContent?.trim().split("\n").map((item) => item.trim())
      )
  );

  const racesArray: Race[] = races.map((race) => {
    return {
      time: race[0],
      venue: race[1],
    };
  });

  await browser.close();

  return JSON.stringify(racesArray);
}

const url =
  "https://www.betfair.com/sport/horse-racing";

scrapeHorseRaces(url).then((data: string) => console.log(data));
