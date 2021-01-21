const express = require("express");
const registerRouter = express.Router();

const RegistrationData = require('../model/registrationdata');
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
    registerRouter.get("/", function (req, res) {
        nav=getNav();
        res.render('register', {
            nav,
        });
    });

    registerRouter.post("/add", function (req, res) {
        var item = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        };
        var user=RegistrationData(item);
        user.save();
        res.redirect('/login');
    });

    return registerRouter;


};
module.exports = router;