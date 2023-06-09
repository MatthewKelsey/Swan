import { Router } from "express";
import { registerUser, login, logout } from "./MongoDB/Controllers/userController";
import {
  eventFinder,
  oddsFinder,
} from "./MongoDB/Controllers/webScraperController";
import { authMiddleware } from "./MongoDB/Middleware/auth";

// Initialise router

const router: Router = Router();

// Scraper routes

router.post("/odds",  oddsFinder);
router.get("/events",  eventFinder);

// User routes

router.post("/register", registerUser);
router.post("/login", login);
router.post('/logout' , logout)
export default router;
