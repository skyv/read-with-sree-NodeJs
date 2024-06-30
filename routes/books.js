import express from 'express';

import { getBooks, getBook, createBook, updateBook, likeBook, deleteBook } from '../controllers/books.js';

const router = express.Router();

router.get('/', getBooks);
router.post('/', createBook);
router.get('/:id', getBook);
router.patch('/:id', updateBook);
router.delete('/:id', deleteBook);
router.patch('/:id/likeBook', likeBook);

export default router;