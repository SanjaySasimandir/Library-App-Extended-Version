const express = require("express");
const bookRouter = express.Router();

const BookData = require('../model/bookdata')
const fs = require('fs');

function getNav(){
    let rawdata = fs.readFileSync('./data/data.json');
    let data = JSON.parse(rawdata);
    if (data.logged_in) {
        nav = data.nav_logged_in;
    } else {
        nav = data.nav_logged_out;
    }
    return nav
}

function router(nav) {
    

    bookRouter.get("/", function (req, res) {
        
        nav=getNav();

        BookData.find().then(function (books) {
            res.render('books', {
                nav,
                books
            });
        });
    });
    bookRouter.get('/data', function (req, res) {
        let rawdata = fs.readFileSync('./data/data.json');
        let data = JSON.parse(rawdata);
        res.send(data);
    })
    bookRouter.get("/:id", function (req, res) {
        let id = req.params.id;
        nav=getNav()
        BookData.find({ _id: id }).then(function (singleBookArray) {
            let book = singleBookArray[0];
            res.render('book', {
                nav,
                book
            });
        })
    });

    return bookRouter;
};
module.exports = router;