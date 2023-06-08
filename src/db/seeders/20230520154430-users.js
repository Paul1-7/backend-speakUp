"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          id: "f89355a5-96e8-4e10-acd3-fa20abe8a614",
          name: "John Doe",
          birthday: "false",
          createdAt: "2015-11-11",
          updatedAt: "2015-11-11",
        },
        {
          id: "98b5fcae-2c9b-4b56-81b0-51ee6d6c64c3",
          name: "John vac",
          birthday: "falssee",
          createdAt: "2015-11-11",
          updatedAt: "2015-11-11",
        },
      ],
      {},
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
