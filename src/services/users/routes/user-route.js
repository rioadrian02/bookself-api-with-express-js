import { Router } from "express";
import { createUser, getUserById } from "../controller/user-controller.js";
import { validateBody } from "../../../middlewares/validation.js";
import { userPayloadSchema } from "../validator/user-schema.js";

const router = Router();

router.post('', validateBody(userPayloadSchema), createUser);
router.get('/:id', getUserById);

export default router;
