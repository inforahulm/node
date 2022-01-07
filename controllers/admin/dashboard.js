const express = require("express");
const bodyParser = require('body-parser');


const dashboard = (async (req,res)=>{
    res.render('admin/dashboard',{  
    });
});

module.exports = {
    dashboard
}