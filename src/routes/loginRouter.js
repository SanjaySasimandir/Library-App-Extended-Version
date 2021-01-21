const express = require("express");
const loginRouter = express.Router();
const fs = require('fs');

const RegistrationData = require('../model/registrationdata');

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

    loginRouter.get("/", function (req, res) {
        nav=getNav();
        res.render('login', {
            nav,
        });
    });

    loginRouter.post('/check', function (req, res) {
        var username = req.body.username;
        var password = req.body.password;

        let usernamedetails = [];
        let emaildetails = [];

        RegistrationData.find({ username: username, password: password }).then(function (user) {
            usernamedetails = user;
        });

        RegistrationData.find({ email: username, password: password }).then(function (user) {
            emaildetails = user;

            if (usernamedetails.length != 0 || emaildetails.length != 0) {
                let firstname = usernamedetails.concat(emaildetails)[0].firstName;
                let rawdata = fs.readFileSync('./data/data.json');
                let data = JSON.parse(rawdata);
                data.name = firstname;
                data.logged_in = true;
                data = JSON.stringify(data, null, 2);
                fs.writeFile('./data/data.json', data, (err) => {
                    if (err) throw err;
                    else {
                        res.redirect('/login/loginsuccess');
                    }
                });
            }
            else {
                res.redirect('/login');
            }
        });


    });

    loginRouter.get('/loginsuccess', function (req, res) {
        let rawdata = fs.readFileSync('./data/data.json');
        let data = JSON.parse(rawdata);
        let firstname = data.name;
        res.render('success', {
            message: `Welcome Back, ${firstname}!`,
            rediectPage: '/'
        });
    });

    return loginRouter;
};
module.exports = router;