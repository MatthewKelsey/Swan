import { Router } from "express";
import { registerUser, login } from "./MongoDB/Controllers/userController";
import {
  eventFinder,
  oddsFinder,
} from "./MongoDB/Controllers/webScraperController";

// Initialise router

const router: Router = Router();

// Scraper routes

router.post("/odds", oddsFinder);
router.get("/events", eventFinder);

// User routes

router.post("/register", registerUser);
router.post("/login", login);

export default router;
