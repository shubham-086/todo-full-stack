import { Router } from "express";
const router = Router();
import { login, signUp } from "../controllers/auth-controllers.js";

router.post("/login", login);
router.post("/signup", signUp);

export default router;
