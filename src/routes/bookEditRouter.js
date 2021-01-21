const express = require("express");
const bookEditRouter = express.Router();

const BookData = require('../model/bookdata');
const fs = require('fs');

const multer = require('multer'); // For transferring files
const path = require('path');
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

    bookEditRouter.get("/", function (req, res) {
        nav=getNav();
        BookData.find().then(function (books) {
            res.render('booksedit', {
                nav,
                books,
            });
        })
    });

    bookEditRouter.post("/edit", function (req, res) {
        let upload = multer({ storage: storage }).single('img');
        let filePath = "";
        upload(req, res, function (err) {
            if (err) throw err
            else {
                if (req.file)
                    filePath += req.file.path;
                filePath = filePath.substring(6, filePath.length);
            }
            BookData.findById(req.body.id).then(function (book) {
                book.title = req.body.title;
                book.author = req.body.author;
                book.genre = req.body.genre;

                if (req.file) {
                    var oldImagePath = path.join('./public' + book.img);
                    if (fs.existsSync(oldImagePath)) {
                        fs.unlinkSync(path.join('./public' + book.img));
                    }
                    book.img = filePath;
                }
                book.rating = req.body.rating;
                book.description = req.body.description;
                book.save();
                res.redirect('/edit/books/edit/success');
            });
        });
    });

    bookEditRouter.get("/edit/success", function (req, res) {
        res.render('success', {
            message: `Updating`,
            rediectPage: '/edit/books'
        });
    });

    bookEditRouter.post('/delete',function(req,res){
        BookData.deleteMany({_id:{$in:req.body.deleteCheckBox}},function(err,result){
            if (err) throw err
            else{
                res.render('success', {
                    message: `Updating Book List`,
                    rediectPage: '/edit/books'
                });
            }
        });
    });

    bookEditRouter.get("/:id", function (req, res) {
        let id = req.params.id;
        nav=getNav();
        BookData.find({ _id: id }).then(function (singleBookArray) {
            let book = singleBookArray[0];
            res.render('bookedit', {
                nav,
                book,
            });
        })
    });
    return bookEditRouter;
};

module.exports = router;