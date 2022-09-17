'use strict';
import { hashPassword } from '../utils/tools';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
    */
    await queryInterface.bulkInsert('Users', [{
      id: '38eb202c-3f67-4eed-b7ac-9c31bc226e0c',
      name: 'Demo User',
      username: 'DemoUser',
      email: 'user@localhost.com',
      password:  hashPassword('admin123')
    }], {});
    
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};