'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.changeColumn(
      'Likes',
      'userID',
      {
        type: Sequelize.INTEGER,
        references: {
          model: "Usernames",
          key: "id"
        }
      }
    )
  },


  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
