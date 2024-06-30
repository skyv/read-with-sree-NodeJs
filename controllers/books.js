import express from 'express';
import mongoose from 'mongoose';

import BookSchema from '../models/bookSchema.js';

const router = express.Router();

export const getBooks = async (req, res) => { 
    try {
        const books = await BookSchema.find({});
        res.status(200).json(books);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getBook = async (req, res) => { 
    const { id } = req.params;
    const findQuery = {id: id};
    try {
        const book = await BookSchema.find(findQuery);
        
        res.status(200).json(book[0]);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createBook = async (req, res) => {
     
    const { id, title, author, description, rating, status, imgUrl, thumbnailUrl, category, publishedOn } = req.body;

    const newBook = new BookSchema({ id, title, author, description, rating, status, imgUrl, thumbnailUrl, category, publishedOn })

    try {
        await newBook.save();

        res.status(201).json(newBook );
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updateBook = async (req, res) => {
    const { id } = req.params;
    const { title, author, description, rating, status, imgUrl, thumbnailUrl, category, publishedOn } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No book with id: ${id}`);

    const updatedBook = { title, author, description, rating, status, imgUrl, thumbnailUrl, category, publishedOn, _id: id };

    await BookSchema.findByIdAndUpdate(id, updatedBook, { new: true });

    res.json(updatedBook);
}

export const deleteBook = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    await BookSchema.findByIdAndRemove(id);

    res.json({ message: "Post deleted successfully." });
}

export const likeBook = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    
    const book = await BookSchema.findById(id);

    const updatedBook = await BookSchema.findByIdAndUpdate(id, { likeCount: book.likeCount + 1 }, { new: true });
    
    res.json(updatedBook);
}


export default router;