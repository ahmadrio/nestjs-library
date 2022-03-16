'use strict';

// import { faker } from '@faker-js/faker';
// import * as bcrypt from 'bcrypt';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { faker } = require('@faker-js/faker');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = require('bcryptjs');

const users = [...Array(5)].map(() => {
  return {
    name: faker.name.findName(),
    email: faker.internet.email(),
    password: generatePassword('password123'),
    createdAt: new Date(),
    updatedAt: new Date(),
  };
});

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
    await queryInterface.bulkInsert('users', users, {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('users', null, {});
  },
};

function generatePassword(value) {
  const saltOrRounds = bcrypt.genSaltSync();
  const hash = bcrypt.hashSync(value, saltOrRounds);

  return hash;
}
