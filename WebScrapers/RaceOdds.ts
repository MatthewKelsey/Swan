import puppeteer, { Browser, Page } from "puppeteer";
import { parse, format } from "date-fns";
interface HorseObject {
  horseName: string;
  odds: string;
}

export async function scrapeHorseRacingOdds(url: string): Promise<string> {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox"],
  });

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
  eventDateTime: Date;
}
export async function scrapeHorseRaces(url: string): Promise<string> {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox"],
  });

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
      const raceArray: string[] = raceName.split(" ");

      const today = new Date();
      const eventTime = raceArray[0];
      const eventDate = today.toLocaleDateString("en-GB");
      const eventDateTime = parse(
        `${eventDate} ${eventTime}`,
        "dd/MM/yyyy HH:mm",
        new Date()
      );

      const infoObj: RaceInfo = {
        eventUrl: href || "",
        event: raceName,
        eventDateTime: eventDateTime,
      };

      raceInfoList.push(infoObj);
    }
  }
  await browser.close();
  return JSON.stringify(raceInfoList);
}
