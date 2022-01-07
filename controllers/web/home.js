const express = require("express");
const bodyParser = require('body-parser');
const moment = require('moment');
const fs = require('fs');
// const { Model } = require("sequelize/dist");

const home = (async (req, res) => { 
    res.render('web/index');
});

module.exports = {
    home
}