const express = require("express");
const editRouter = express.Router();
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

    editRouter.get("/", function (req, res) {
        nav=getNav();
        res.render('edit', { nav });
    });

    var bookEditRouter=require('./bookEditRouter')(nav);
    editRouter.use('/books',bookEditRouter);

    var authorEditRouter = require('./authorEditRouter')(nav)
    editRouter.use('/authors', authorEditRouter)


    return editRouter;
};
module.exports = router;