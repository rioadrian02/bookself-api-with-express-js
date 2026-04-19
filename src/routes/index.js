import { Router } from "express";
import books from "../services/books/routes/index.js";
import users from "../services/users/routes/user-route.js";
import authentications from "../services/authentications/routes/authentication-route.js";

const router = Router();

router.use("/books", books);
router.use("/users", users);
router.use("/authentications", authentications);

export default router;