import mongoose from 'mongoose';

const bookSchema = mongoose.Schema({ 
    id: Number,
    title: String,
    author: String,
    description: String,
    rating: Number,
    status: String,
    imgUrl: String,
    thumbnailUrl: String,
    category: String,
    publishedOn: String
})

var BookSchema = mongoose.model('BookSchema', bookSchema, 'myBooks');

export default BookSchema;