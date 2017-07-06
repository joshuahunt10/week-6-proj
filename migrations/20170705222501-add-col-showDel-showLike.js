'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.addColumn(
      'Posts',
      'showDel',{
        type: Sequelize.BOOLEAN
      }
    )
    queryInterface.addColumn(
      'Posts',
      'showLike', {
        type: Sequelize.BOOLEAN
      }
    )
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.removeColumn(
      'Posts',
      'showDel'
    )
    queryInterface.removeColumn(
      'Posts',
      'showLike'
    )
  }
};
