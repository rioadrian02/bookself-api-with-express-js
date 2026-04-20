import { Router } from 'express';
import { addCollaboration, deleteCollaboration } from '../controller/collaboration-controller.js';
import authenticateToken from '../../../middlewares/authentication.js';
import { validateBody } from '../../../middlewares/validation.js';
import { collaborationPayloadSchema, collaborationDeletePayloadSchema } from '../validator/collaboration-schema.js';

const router = Router();

router.post('', authenticateToken,validateBody(collaborationPayloadSchema),  addCollaboration);
router.delete('', authenticateToken, validateBody(collaborationDeletePayloadSchema), deleteCollaboration);

export default router;
