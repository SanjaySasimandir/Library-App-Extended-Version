const express = require("express");
const addAuthorRouter = express.Router();

const multer = require('multer'); // For transferring files
const path = require('path');
const fs = require('fs');

const AuthorData = require('../model/authordata')
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

// Configure filename format and storage location
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images/authors');
    },

    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

function router(nav) {
    addAuthorRouter.get("/", function (req, res) {
        nav=getNav()
        res.render('addauthor', {
            nav,
        });
    });

    addAuthorRouter.post("/add", function (req, res) {
        let upload = multer({ storage: storage }).single('img');
        let filePath = "";
        upload(req, res, function (err) {
            if (err) throw err
            else {
                filePath += req.file.path;
            }

            filePath = filePath.substring(6, filePath.length);
            var item = {
                name: req.body.name,
                topic: req.body.topic,
                yob: req.body.yob,
                img: filePath,
                books: req.body.books.split('\n'),
                life: req.body.life
            };
            var author = AuthorData(item);
            author.save();
            res.redirect('/addauthor/success');
        });



    });

    addAuthorRouter.get("/success", function (req, res) {
        res.render('success', {
            message: `Updating Author List`,
            rediectPage: '/authors'
        });
    });

    return addAuthorRouter;
};
module.exports = router;