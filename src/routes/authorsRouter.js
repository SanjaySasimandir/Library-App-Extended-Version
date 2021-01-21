const express = require("express");
const authorRouter = express.Router();

const AuthorData = require('../model/authordata');
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
    // let authors=data.authors;
    authorRouter.get("/", function (req, res) {
        nav=getNav();
        AuthorData.find().then(function (authors) {
            res.render('authors', {
                nav,
                authors,
            });
        })
    });
    authorRouter.get("/:id", function (req, res) {
        nav=getNav();
        let id = req.params.id;
        AuthorData.find({_id:id}).then(function(singleAuthorArray){
            let author=singleAuthorArray[0];
            res.render('author', {
                nav,
                author,
            });
        })
    });

    return authorRouter;
};
module.exports = router;