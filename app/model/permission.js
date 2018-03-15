'use strict'

module.exports = app => {
  const { STRING, INTEGER, DATE, TEXT } = app.Sequelize;

  const Permission = app.model.define('permission', {
    perName: STRING,   // 权限名
    permission: STRING,   // 权限值（权限url）
    tagId: INTEGER,    // 权限所属分类
  }, {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    freezeTableName: true
  });

  return Permission;
};
