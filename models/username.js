'use strict';
module.exports = function(sequelize, DataTypes) {
  var Username = sequelize.define('Username', {
    username: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Username;
};