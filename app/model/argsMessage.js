'use strict'
const [PAGE, PAGESIZE] = [1, 10]    // 当前页，页大小默认值
module.exports = app => {
  const { STRING, INTEGER, DATE, TEXT, FLOAT } = app.Sequelize;

  const ArgsMessage = app.model.define('argsMessage', {
    argsId: INTEGER,    // 参数id
    deviceId: INTEGER,   // 设备id
    argsValue: FLOAT    // 参数值
  }, {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
      freezeTableName: true
    });

  ArgsMessage.register = async function (fields) {
    return await this.create(fields)
  }

  ArgsMessage.getOneByArgs = function (params, exclude) {
    return this.findOne({
      where: params,
      attributes: {
        exclude: exclude.split(',')
      },
      include: [{
        model: app.model.Device,
        where: { id: app.Sequelize.col('argsMessage.deviceId') }
      },{
        model: app.model.DeviceArg,
        where: { id: app.Sequelize.col('argsMessage.argsId') }
      }],
      order: [
        ['createdAt', 'ASC']
      ]
    })
  }

  // 查询列表
  ArgsMessage.getList = function ({ params, page, pageSize }) {
    if (!page && !pageSize) {
      return this.findAndCountAll({
        where: params, 
        include: [{
          model: app.model.Device,
          where: { id: app.Sequelize.col('argsMessage.deviceId') }
        },{
          model: app.model.DeviceArg,
          where: { id: app.Sequelize.col('argsMessage.argsId') }
        }],
        order: [
          ['createdAt', 'ASC']
        ]
      })
    }
    page = page || PAGE
    pageSize = pageSize || PAGESIZE
    return this.findAndCountAll({
      where: params,
      offset: (page - 1) * pageSize,
      limit: pageSize,
      include: [{
        model: app.model.Device,
        where: { id: app.Sequelize.col('argsMessage.deviceId') }
      },{
        model: app.model.DeviceArg,
        where: { id: app.Sequelize.col('argsMessage.argsId') }
      }],
      order: [
        ['createdAt', 'ASC']
      ]
    })
  }

  ArgsMessage.deleteByArgs = function (args) {
    return this.destroy({
      where: args
    })
  }

  ArgsMessage.updateById = function (id, fields) {
    return this.update(fields, {
      where: { id: id }
    })
  }

  ArgsMessage.associate = function() {
    app.model.ArgsMessage.belongsTo(app.model.Device, {
      constraints: false,
      foreignKey: 'deviceId'
    })
    app.model.ArgsMessage.belongsTo(app.model.DeviceArg, {
      constraints: false,
      foreignKey: 'argsId'
    })
  }

  return ArgsMessage;
};
