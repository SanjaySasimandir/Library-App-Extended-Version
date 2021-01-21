// Accessing Mongoose Package
const mongoose = require('mongoose');

// Database connection
mongoose.connect('mongodb+srv://userone:userone@libraryappdata.bes0v.mongodb.net/LibraryAppData?retryWrites=true&w=majority');

// Schema Definition
const Schema = mongoose.Schema;

const BookSchema = new Schema({
    title: String,
    author: String,
    genre: String,
    rating: String,
    img: String,
    description: String
});

// Model Creation
var Bookdata = mongoose.model('bookdata', BookSchema);

module.exports = Bookdata;