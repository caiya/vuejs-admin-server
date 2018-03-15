'use strict'

module.exports = app => {
  const { STRING, INTEGER, DATE, TEXT } = app.Sequelize;

  const Tag = app.model.define('tag', {
    name: {type: STRING, allowNull: false, unique: true},   // 权限分类名称
  }, {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    freezeTableName: true
  });

  return Tag;
};
