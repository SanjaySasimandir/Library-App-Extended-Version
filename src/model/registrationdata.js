// Accessing Mongoose Package
const mongoose = require('mongoose');

// Database connection
mongoose.connect('mongodb+srv://userone:userone@libraryappdata.bes0v.mongodb.net/LibraryAppData?retryWrites=true&w=majority');

// Schema Definition
const Schema = mongoose.Schema;

const RegistrationSchema = new Schema({
    firstName: String,
    lastName: String,
    username: String,
    email: String,
    password: String
});

// Model Creation
var RegistrationData = mongoose.model('registrationdata', RegistrationSchema);

module.exports = RegistrationData;