const express = require("express");
const logoutRouter = express.Router();
const fs = require('fs');


function router(nav) {

    logoutRouter.get("/", function (req, res) {
        

        let rawdata = fs.readFileSync('./data/data.json');
        let data = JSON.parse(rawdata);

        data.logged_in = false;
        data = JSON.stringify(data, null, 2);
        fs.writeFile('./data/data.json', data, (err) => {
            if (err) throw err;
            else {
                res.redirect('/logout/logoutsuccess');
            }
        });
    });


    logoutRouter.get("/logoutsuccess", function (req, res) {
        let rawdata = fs.readFileSync('./data/data.json');
        let data = JSON.parse(rawdata);
        let firstname = data.name;

        res.render('success',{
            message: `See you soon, ${firstname}!`,
            rediectPage:'/'
        });
    });

    return logoutRouter;
};
module.exports = router;