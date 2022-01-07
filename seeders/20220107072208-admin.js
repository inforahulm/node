'use strict';


const md5 = require("md5");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

     await queryInterface.bulkInsert('Admins', [{
      name: 'rahul',
      email: 'admin@gmail.com',
      password: md5('123456'),
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },
  
  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('Admins', null, {});
  }
};
