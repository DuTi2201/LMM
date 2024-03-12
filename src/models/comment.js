'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    static associate(models) {
      // define association here
      Comment.belongsTo(Syllabus);
      Comment.belongsTo(Account);
    }
  };
  Comment.init({
    comment_content: DataTypes.STRING,
    comment_date: DataTypes.STRING,
    comment_parent_id: DataTypes.INTEGER,
    syllabus_id: DataTypes.INTEGER,
    account_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};