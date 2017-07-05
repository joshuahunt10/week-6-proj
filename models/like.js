'use strict';
module.exports = function(sequelize, DataTypes) {
  var Like = sequelize.define('Like', {
    userID: DataTypes.INTEGER,
    postID: DataTypes.INTEGER
  }, {});

  Like.associate = function(models){
    Like.belongsToMany(models.Post, {through: 'id'})
    Like.belongsToMany(models.Username, {through: 'id'})
  }
  return Like;
};
