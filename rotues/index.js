
const express = require('express');
const passport = require('passport');
require('dotenv').config();
const router = express.Router();

const AdminLoginController = require('../controllers/admin/login');
const AdminDashboardController = require('../controllers/admin/dashboard');


const HomeWebController = require('../controllers/web/home');

router.prefix('/admin', (route) => {
    route.get('/', AdminLoginController.login);
    route.post('/', passport.authenticate('Local', {
        successRedirect: '/admin/dashboard',
        failureRedirect: '/admin',
        // failureFlash: true
    }));

    route.get('/dashboard',  AdminAuthUser ,AdminDashboardController.dashboard);
    route.get('/chat',  AdminAuthUser ,AdminDashboardController.chat);
    route.get('/admin-logout', AdminLoginController.logout);

});


router.prefix('/', (route) => {
    route.get('/', HomeWebController.home);
});



async function AdminAuthUser(req, res, next) {


    if (req.isAuthenticated()) {

        if (req.session.passport !== undefined && req.session.passport['user'] != undefined ) {
            req.isLogged = true;
            var seaechstr = req.path;

            next();
        } else {
            res.redirect('/admin');
        }
    } else {
        res.redirect('/admin');
    }
    //next();
}



module.exports = router;
