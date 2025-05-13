import express from "express";
import { register, login, logout, getUser} from "../controllers/userController.js";  // ✅ Correct if it's a named export
import { isAuthenticated } from "../middleware/auth.js";
const router = express.Router();

router.post("/register", register);  // ✅ Calling controller function
router.post("/login",login);
router.get("/logout",isAuthenticated, logout);
router.get("/getuser", isAuthenticated, getUser);
export default router;
