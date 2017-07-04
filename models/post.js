'use strict';
module.exports = function(sequelize, DataTypes) {
  var Post = sequelize.define('Post', {
    title: DataTypes.STRING,
    body: DataTypes.TEXT,
    user: DataTypes.INTEGER
  }, {});

  Post.associate = function(models){
    Post.belongsTo(models.Username, {foreignKey: 'user'})
  }

  return Post;
};
