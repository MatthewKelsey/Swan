import { Router } from "express";
import { registerUser, login } from "./MongoDB/Controllers/userController";
import {
  eventFinder,
  oddsFinder,
} from "./MongoDB/Controllers/webScraperController";
import authMiddleware from "./MongoDB/Middleware/auth";

// Initialise router

const router: Router = Router();

// Scraper routes

router.post("/odds", authMiddleware, oddsFinder);
router.get("/events", authMiddleware, eventFinder);

// User routes

router.post("/register", registerUser);
router.post("/login", login);

export default router;
