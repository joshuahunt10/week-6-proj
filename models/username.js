'use strict';
module.exports = function(sequelize, DataTypes) {
  var Username = sequelize.define('Username', {
    username: DataTypes.STRING,
    password: DataTypes.STRING
  }, {});

  Username.associate = function(models){
    Username.hasMany(models.Post, {as: 'post', foreignKey: 'userID'})
    // Username.hasMany(models.Like, {foreignKey: 'id'})
  }

  return Username;
};
