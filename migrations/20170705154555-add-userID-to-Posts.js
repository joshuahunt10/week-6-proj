'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'Posts',
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
    return queryInterface.removeColumn(
      'Posts',
      'userID'
    )
  }
};
