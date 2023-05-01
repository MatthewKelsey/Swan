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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.scrapeHorseRaces = exports.scrapeHorseRacingOdds = void 0;
const puppeteer_1 = __importDefault(require("puppeteer"));
function scrapeHorseRacingOdds(url) {
    return __awaiter(this, void 0, void 0, function* () {
        const browser = yield puppeteer_1.default.launch({ headless: true, args: ['~~no~sandbox'] });
        const page = yield browser.newPage();
        yield page.goto(url);
        yield page.waitForSelector(".runner-name-value");
        const horseNames = yield page.$$eval("tbody .runner-name-value", (elements) => elements.map((el) => { var _a; return (_a = el.textContent) === null || _a === void 0 ? void 0 : _a.trim(); }));
        const horseOdds = yield page.$$eval("tbody span.ui-runner-price", (prices) => prices.map((price) => price.textContent || ""));
        const mergedData = horseNames.map((name, i) => ({
            horseName: name || "",
            odds: horseOdds[i] || "",
        }));
        yield browser.close();
        return JSON.stringify(mergedData);
    });
}
exports.scrapeHorseRacingOdds = scrapeHorseRacingOdds;
function scrapeHorseRaces(url) {
    return __awaiter(this, void 0, void 0, function* () {
        const browser = yield puppeteer_1.default.launch({ headless: true, args: ['~~no~sandbox'] });
        const page = yield browser.newPage();
        yield page.goto("https://www.betfair.com/sport/horse-racing");
        const links = yield page.$$(".races-window .ui-nav.ui-gtm-click");
        const raceInfoList = [];
        for (const link of links) {
            const href = yield link.evaluate((node) => node.getAttribute("href"));
            const raceName = yield link.evaluate((node) => node.getAttribute("data-galabel"));
            if (raceName &&
                raceName.match(/\d+/) &&
                !raceName.includes("view full race card")) {
                const infoObj = {
                    eventUrl: href || "",
                    event: raceName,
                };
                raceInfoList.push(infoObj);
            }
        }
        yield browser.close();
        return JSON.stringify(raceInfoList);
    });
}
exports.scrapeHorseRaces = scrapeHorseRaces;
