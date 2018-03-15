'use strict'

module.exports = app => {
  const { STRING, INTEGER, DATE, TEXT } = app.Sequelize;

  const Role = app.model.define('role', {
    role: {type: STRING, allowNull: false, unique: true},   // 角色名英文
    roleName: {type: STRING, allowNull: false, unique: true},   // 角色名称（中文）
    pid: TEXT,    // 权限id集合
    permission: TEXT      // 权限url集合
  }, {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    freezeTableName: true
  });

  return Role;
};
