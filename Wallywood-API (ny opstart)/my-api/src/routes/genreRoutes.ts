import { Router } from 'express';
import { getRecord, getRecords } from '../controllers/genreController.js'

const router = Router ();
router.get('/', getRecords);
router.get('/:slug', getRecord);


export const genreRoutes = router;
