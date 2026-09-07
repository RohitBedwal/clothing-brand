import { Router } from 'express';
import * as collectionController from '../controllers/collectionController.js';
import { adminOnly } from '../middleware/adminMiddleware.js';


const router = Router();

router.get('/', collectionController.getCollections);
router.get('/:slug', collectionController.getCollectionBySlug);
router.post('/', adminOnly, collectionController.createCollection);
router.put('/:id', adminOnly, collectionController.updateCollection);
router.delete('/:id', adminOnly, collectionController.deleteCollection);

export default router;
