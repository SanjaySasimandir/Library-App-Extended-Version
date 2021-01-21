const express = require("express");
const app = new express();

const port = process.env.PORT || 8000;


// const data = require('./data/data.json');
const fs = require('fs');
let rawdata = fs.readFileSync('./data/data.json');
let data = JSON.parse(rawdata);
var nav = [];
if (data.logged_in) {
  nav = data.nav_logged_in;
} else {
  nav = data.nav_logged_out;
}


app.use(express.urlencoded({ extended: true }));
app.use(express.static('./public'));
app.set('view engine', 'ejs');
app.set('views', "./src/views");

app.get("/", function (req, res) {
  res.redirect('/books')

});


// Login Router
var loginRouter = require('./src/routes/loginRouter')(nav);
app.use('/login', loginRouter);

// Log Out Router
var logOutRouter = require('./src/routes/logOutRouter')(nav);
app.use('/logout', logOutRouter);

// Register Router
var registerRouter = require('./src/routes/registerRouter')(nav);
app.use('/register', registerRouter);

// Authors Router
var authorsRouter = require('./src/routes/authorsRouter')(nav);
app.use('/authors', authorsRouter);

// Books Router
var booksRouter = require('./src/routes/booksRouter')(nav);
app.use('/books', booksRouter);

// Add Book Router
var addBookRouter = require('./src/routes/addBookRouter')(nav);
app.use('/addbook', addBookRouter);

// Add Author Router
var addAuthorRouter = require('./src/routes/addAuthorRouter')(nav);
app.use('/addauthor', addAuthorRouter);

// Edit Router
var editRouter = require('./src/routes/editRouter')(nav);
app.use('/edit', editRouter);

// Invalid Page
app.use(function (req, res, next) {
  res.render('pagenotfound', {
    nav
  });
});

app.listen(port, function () {
  console.log(`Listening at ${port}`);
});