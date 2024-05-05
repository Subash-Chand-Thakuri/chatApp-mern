import express from 'express';
import {sendMessage, allMessage}from '../controllers/messageControllers.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(protect,sendMessage)
router.route('/:chatId').get(protect,allMessage)

export default router;