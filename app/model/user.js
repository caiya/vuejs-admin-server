'use strict'

const bcrypt = require('bcryptjs');
const [PAGE, PAGESIZE] = [1, 10]    // 当前页，页大小默认值

module.exports = app => {
  const { STRING, INTEGER, DATE, BOOLEAN } = app.Sequelize;

  const User = app.model.define('user', {
    name: { type: STRING(30), unique: true, allowNull: false },   // 用户名
    hashedPassword: STRING,     // hashed密码
    passwordResetToken: STRING,
    resetTokenExpires: DATE,
    age: INTEGER,     // 年龄
    lastSignInAt: DATE,   // 上次登录
    status: STRING,   // 用户状态
    email: {type: STRING, unique: true, allowNull: false},    // 邮箱
    roleId: INTEGER,    // 角色id
    avatar: STRING,   // 头像
    company: STRING,    // 公司
    mobile: STRING,   // 电话号码
    info: STRING,   // 说明
    isAdmin: BOOLEAN    // 是否管理员（暂时权限这么来）
  }, {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
      freezeTableName: true
    });

  // static methods
  User.register = async function (fields) {
    fields.hashedPassword = User.hashPassword(fields.password);
    delete fields.password;
    return await this.create(fields);
  }

  User.getUser = async function (name, password) {
    return await this.authenticate(name, password);
  }

  User.authenticate = async function (name, password) {
    let user = await this.findOne({
      where: { name: name },
      attributes: ['id', 'name', 'age', 'hashedPassword']
    });
    if (!user) return null;
    return bcrypt.compareSync(password, user.hashedPassword) ? (delete user.dataValues.hashedPassword && user) : null;
  };

  // 查询指定参数
  User.queryUser = async function (params) {
    return await this.findOne({
      where: params,
      attributes: ['id', 'name', 'age']
    })
  }

  // 查询或新增
  User.findOrCreateOne = async function (fields) {
    if (fields.password) {
      fields.hashedPassword = User.hashPassword(fields.password);
      delete fields.password;
    }
    return this.findOrCreate({
      where: fields
    })
  }

  // 根据参数获取用户
  User.getUserByArgs = function (params, exclude) {
    return this.findOne({
      where: params,
      attributes: {
        exclude: exclude.split(',')
      }
    })
  }

  // 密码hash
  User.hashPassword = function (password) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  }

  // 查询用户列表
  User.getList = function ({ params, page, pageSize }) {
    if (!page && !pageSize) {
      return this.findAndCountAll({ where: params })
    }
    page = page || PAGE
    pageSize = pageSize || PAGESIZE
    return this.findAndCountAll({
      where: params, 
      offset: (page - 1) * pageSize,
      limit: pageSize
    })
  }

  User.deleteByArgs = function(args) {
    return this.destroy({
      where: args
    })
  }

  User.updateById = function(id, fields) {
    return this.update(fields, {
      where: { id: id}
    })
  }

  // instance methods
  User.prototype.logSignin = async function () {
    await this.update({ lastSignInAt: new Date() });
  }

  return User;
};
