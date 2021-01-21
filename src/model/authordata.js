// Accessing Mongoose Package
const mongoose = require('mongoose');

// Database connection
mongoose.connect('mongodb+srv://userone:userone@libraryappdata.bes0v.mongodb.net/LibraryAppData?retryWrites=true&w=majority');

// Schema Definition
const Schema = mongoose.Schema;

const AuthorSchema = new Schema({
    name: String,
    topic: String,
    yob: String,
    img: String,
    books: Array,
    life: String
});

// Model Creation
var Authordata = mongoose.model('authordata', AuthorSchema);

module.exports = Authordata;