'use strict';
module.exports = function(sequelize, DataTypes) {
  var Username = sequelize.define('Username', {
    username: DataTypes.STRING,
    password: DataTypes.STRING
  }, {});

  Username.associate = function(models){
    Username.hasMany(models.Post, {foreignKey: 'user'})
  }

  return Username;
};
