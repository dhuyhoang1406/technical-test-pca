"use strict";
const { v4: uuidv4 } = require("uuid");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Users", [
      {
        id: uuidv4(),
        email: "email1@example.com",
        firstName: "FN1",
        lastName: "LN1",
        password: "123456",
        deleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        email: "email2@example.com",
        firstName: "FN2",
        lastName: "LN2",
        password: "123456",
        deleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        email: "email3@example.com",
        firstName: "FN3",
        lastName: "LN3",
        password: "123456",
        deleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
