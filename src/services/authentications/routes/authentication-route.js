import { Router } from 'express';
import { login, refreshToken, logout } from '../controller/authentication-controller.js';
import { validateBody } from '../../../middlewares/validation.js';
import { postAuthenticationPayloadSchema, putAuthenticationPayloadSchema, deleteAuthenticationPayloadSchema } from '../validator/authentication-schema.js';

const router = Router();

router.post('', validateBody(postAuthenticationPayloadSchema), login);
router.put('', validateBody(putAuthenticationPayloadSchema),refreshToken);
router.delete('', validateBody(deleteAuthenticationPayloadSchema), logout);

export default router;

