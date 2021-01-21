const express = require("express");
const authorEditRouter = express.Router();

const AuthorData = require('../model/authordata');
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
        cb(null, './public/images/authors');
    },

    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

function router(nav) {

    authorEditRouter.get("/", function (req, res) {
        nav=getNav()
        AuthorData.find().then(function (authors) {
            res.render('authorsedit', {
                nav,
                authors,
            });
        })
    });

    authorEditRouter.post("/edit", function (req, res) {
        let upload = multer({ storage: storage }).single('img');
        let filePath = "";
        upload(req, res, function (err) {
            if (err) throw err
            else {
                if (req.file)
                    filePath += req.file.path;
                filePath = filePath.substring(6, filePath.length);
            }
            AuthorData.findById(req.body.id).then(function (author) {
                author.name = req.body.name;
                author.topic = req.body.topic;
                author.yob = req.body.yob;

                if (req.file) {
                    var oldImagePath = path.join('./public' + author.img);
                    if (fs.existsSync(oldImagePath)) {
                        fs.unlinkSync(path.join('./public' + author.img));
                    }
                    author.img = filePath;
                }
                author.books = req.body.books.split('\n');
                author.life = req.body.life;
                author.save();
                res.redirect('/edit/authors/edit/success');
            });
        });
    });

    authorEditRouter.get("/edit/success", function (req, res) {
        res.render('success', {
            message: `Updating Author List`,
            rediectPage: '/edit/authors'
        });
    });

    authorEditRouter.post('/delete',function(req,res){
        AuthorData.deleteMany({_id:{$in:req.body.deleteCheckBox}},function(err,result){
            if (err) throw err
            else{
                res.render('success', {
                    message: `Updating Author List`,
                    rediectPage: '/edit/authors'
                });
            }
        });
    });

    authorEditRouter.get("/:id", function (req, res) {
        let id = req.params.id;
        nav=getNav()
        AuthorData.find({ _id: id }).then(function (singleAuthorArray) {
            let author = singleAuthorArray[0];
            res.render('authoredit', {
                nav,
                author,
            });
        })
    });
    return authorEditRouter;
};

module.exports = router