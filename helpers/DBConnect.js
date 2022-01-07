const dotenv = require('dotenv');
dotenv.config();
const Sequelize = require('sequelize')

const AdminModel = require('./../models/admin');

const sequelize = new Sequelize(process.env.db, process.env.user, process.env.password, {
    host: 'localhost',
    dialect: 'mysql',
    logging: true,
    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
})

sequelize.authenticate().then(function (errors) {
    console.log(errors)
});


const Admin = AdminModel(sequelize, Sequelize);



module.exports = {
    Admin, 
}