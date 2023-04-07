import puppeteer from "puppeteer";

type HorseObject = {
  horseName: string;
  odds: string;
};

async function scrapeHorseRacingOdds(url: string): Promise<string> {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(url);

  await page.waitForSelector(".runner-name-value");

  const horseNames = await page.$$eval(".runner-name-value", (elements) =>
    elements.map((el) => el.textContent?.trim())
  );

  const horseOdds = await page.$$eval("span.ui-runner-price", (prices) =>
    prices.map((price) => price.textContent || "")
  );

  const mergedData: HorseObject[] = horseNames.map((name, i) => ({
    horseName: name || "",
    odds: horseOdds[i] || "",
  }));

  await browser.close();

  return JSON.stringify(mergedData);
}

const url =
  "https://www.betfair.com/sport/horse-racing/meeting?eventId=32241670&raceTime=1680775200000&dayToSearch=20230406&marketId=924.354900826";

scrapeHorseRacingOdds(url).then((data) => console.log(data));
