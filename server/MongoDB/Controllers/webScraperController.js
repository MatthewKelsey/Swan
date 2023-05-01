"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.oddsFinder = exports.eventFinder = void 0;
const RaceOdds_1 = require("../../../WebScrapers/RaceOdds");
function eventFinder(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const events = yield (0, RaceOdds_1.scrapeHorseRaces)("https://www.betfair.com/sport/horse-racing");
            if (events) {
                res.send(events);
            }
        }
        catch (error) {
            console.error(error);
            res.status(500).send("Internal server error");
        }
    });
}
exports.eventFinder = eventFinder;
function oddsFinder(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const odds = yield (0, RaceOdds_1.scrapeHorseRacingOdds)(req.body.url);
            if (odds) {
                res.send(odds);
            }
        }
        catch (error) {
            console.error(error);
            res.status(500).send("Internal server error");
        }
    });
}
exports.oddsFinder = oddsFinder;
