const express = require("express");
const bodyParser = require('body-parser');


const dashboard = (async (req,res)=>{
    res.render('admin/dashboard',{  
    });
});

const chat = (async (req,res)=>{
    res.render('admin/chat',{  
    });
});


module.exports = {
    dashboard,
    chat
}