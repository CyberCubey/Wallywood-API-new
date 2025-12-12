import { Router } from 'express';
import { getRecord, getRecords } from '../controllers/posterController.js';

const router = Router();
router.get('/', getRecords);

router.get('/:slug', getRecord);
export const posterRoutes = router;

