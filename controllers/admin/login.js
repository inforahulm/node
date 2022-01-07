const express = require("express");
const bodyParser = require('body-parser');
const multer = require('multer');
const mkdirp = require('mkdirp');
const path = require('path');
const fs = require('fs');


const login = ((req,res)=>{   
    res.render('admin/login',{
        title:"login",
        login_nav:"active",
        message: req.flash('loginMessage'),
        req
    });

}); 

const logout = (req,res)=>{
    req.logout();
    res.redirect('/Admin');
};



module.exports = { 
    login,
    logout
}