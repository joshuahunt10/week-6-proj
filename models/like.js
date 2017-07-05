'use strict';
module.exports = function(sequelize, DataTypes) {
  var Like = sequelize.define('Like', {
    userID: DataTypes.INTEGER,
    postID: DataTypes.INTEGER
  }, {});

  Like.associate = function(models){
    Like.belongsTo(models.Post, {as: 'post', foreignKey: 'postID'})
    Like.belongsTo(models.Username, {as: 'user', foreignKey: 'userID'})
  }
  return Like;
};
