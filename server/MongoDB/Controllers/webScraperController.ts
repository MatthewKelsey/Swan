import { Request, Response } from "express";
import {
  scrapeHorseRacingOdds,
  scrapeHorseRaces,
} from "../../../WebScrapers/RaceOdds";
export async function eventFinder(req: Request, res: Response) {
  try {
    const events = await scrapeHorseRaces(
      "https://www.betfair.com/sport/horse-racing"
    );
    if (events) {
      res.send(events);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
}

export async function oddsFinder(req: Request, res: Response) {
  try {
    const odds = await scrapeHorseRacingOdds(req.body.url);
    if (odds) {
      res.send(odds);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
}
