const express = require("express");
const addBookRouter = express.Router();

const multer = require('multer');
const path = require('path');
const fs = require('fs');

const BookData = require('../model/bookdata');
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

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images/books');
    },

    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

function router(nav) {
    addBookRouter.get("/", function (req, res) {
        nav=getNav()
        res.render('addbook', {
            nav,
        });
    });

    addBookRouter.post("/add",function (req, res) {
        let upload = multer({ storage: storage }).single('img');
        let filePath = "";
        upload(req, res, function (err) {
            if (err) console.log( err)
            else {
                filePath += req.file.path;
                
                filePath = filePath.substring(6, filePath.length);
                var item = {
                    title: req.body.title,
                    author: req.body.author,
                    genre: req.body.genre,
                    rating: req.body.rating,
                    img: filePath,
                    description: req.body.description,
                };
                var book = BookData(item);
                book.save();
                res.redirect('/addbook/success');
            }
        });

    });

    addBookRouter.get("/success", function (req, res) {
        res.render('success', {
            message: `Updating Book List`,
            rediectPage: '/books'
        });
    });

    return addBookRouter;
};
module.exports = router;