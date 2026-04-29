import { Router } from 'express';
import authenticateToken from '../../../middlewares/authentication';
import { exportBodyPayload } from '../validator/schema.js';
import { validateBody } from '../../../middlewares/validation.js';
import { exportBooks } from '../controller/export-controller.js';

const router = Router();

router.post('/books', authenticateToken, validateBody(exportBodyPayload), exportBooks);

export default router;