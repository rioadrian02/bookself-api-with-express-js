import { Router } from "express";
import { storeBook, getBooks, findById, update, destroy } from "../controller/index.js";
import { NotFoundError }   from "../../../exceptions/index.js";
import { validateBody, validateQuery } from "../../../middlewares/validation.js";
import { bookPayloadSchema, bookQuerySchema } from "../validator/schema.js";
import authenticateToken from "../../../middlewares/authentication.js";

const router = Router();

router.post("", authenticateToken, validateBody(bookPayloadSchema), storeBook);
router.get("", authenticateToken, validateQuery(bookQuerySchema), getBooks);
router.get("/:id", authenticateToken, findById);
router.put("/:id", authenticateToken, validateBody(bookPayloadSchema), update);
router.delete("/:id", authenticateToken, destroy);
router.use((req, res, next)=>{
    return next(new NotFoundError('Halaman tidak ditemukan'));
});

export default router;