"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("./MongoDB/Controllers/userController");
const webScraperController_1 = require("./MongoDB/Controllers/webScraperController");
// Initialise router
const router = (0, express_1.Router)();
// Scraper routes
router.post("/odds", webScraperController_1.oddsFinder);
router.get("/events", webScraperController_1.eventFinder);
// User routes
router.post("/register", userController_1.registerUser);
router.post("/login", userController_1.login);
router.post('/logout', userController_1.logout);
exports.default = router;
