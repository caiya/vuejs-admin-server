'use strict'

module.exports = app => {
  const { STRING, INTEGER, DATE, TEXT, FLOAT } = app.Sequelize;

  const DeviceArg = app.model.define('deviceArg', {
    name: { type: STRING, allowNull: false },   // 参数名称
    desc: { type: STRING, allowNull: true },   // 参数描述
    argsLow: { type: FLOAT, allowNull: true },   // 参数值低
    argsHigh: { type: FLOAT, allowNull: true },   // 参数值高
    deviceId: { type: INTEGER, allowNull: false },   // 所属设备
  }, {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
      freezeTableName: true
    });

  DeviceArg.register = async function (fields) {
    return await this.create(fields)
  }

  DeviceArg.getOneByArgs = function (params, exclude) {
    return this.findOne({
      where: params,
      attributes: {
        exclude: exclude.split(',')
      }
    })
  }

  // 查询列表
  DeviceArg.getList = function ({ params, page, pageSize }) {
    if (!page && !pageSize) {
      return this.findAndCountAll({
        where: params, include: [{
          model: app.model.Device,
          where: { id: app.Sequelize.col('deviceArg.deviceId') }
        }]
      })
    }
    page = page || PAGE
    pageSize = pageSize || PAGESIZE
    return this.findAndCountAll({
      where: params,
      offset: (page - 1) * pageSize,
      limit: pageSize
    })
  }

  DeviceArg.deleteByArgs = function (args) {
    return this.destroy({
      where: args
    })
  }

  DeviceArg.updateById = function (id, fields) {
    return this.update(fields, {
      where: { id: id }
    })
  }

  DeviceArg.findAllArgs = function (params) {
    return this.findAll({
      where: params
    })
  }

  DeviceArg.associate = function () {
    app.model.DeviceArg.belongsTo(app.model.Device, {
      constraints: false,
      foreignKey: 'deviceId'
    })
  }

  return DeviceArg;
};
