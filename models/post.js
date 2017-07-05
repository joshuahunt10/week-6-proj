'use strict';
module.exports = function(sequelize, DataTypes) {
  var Post = sequelize.define('Post', {
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'We need a title for this...'
        }
      }
    },
    body: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [1,140],
          msg: 'Use between 1 and 140 characters!'
        }
      }
    },
  }, {});

  Post.associate = function(models){
    Post.belongsTo(models.Username, {as: 'username', foreignKey: 'userID'})
    // Post.hasMany(models.Like, {foreignKey: 'id'})
  }

  return Post;
};
