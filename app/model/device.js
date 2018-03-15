'use strict'
const [PAGE, PAGESIZE] = [1, 10]    // 当前页，页大小默认值
module.exports = app => {
  const { STRING, INTEGER, DATE, TEXT } = app.Sequelize;

  const Device = app.model.define('device', {
    name: { type: STRING, unique: true, allowNull: false },
    code: { type: STRING, unique: true },    // 设备编号
    key: STRING,    // 设备激活码
    pubNetAddr: STRING,   // 公网地址
    type: INTEGER,   // 设备分类
    desc: TEXT,   // 设备描述
    model: STRING,    // 设备型号
    prodDate: DATE,   // 出厂日期
    userId: { type: INTEGER, allowNull: false },      // 所属用户
    pic: STRING,   // 原理图
    status: STRING,   // 设备状态
    runTime: INTEGER,   // 设备运行时间（时间戳：单位为s）
    infoFiles: TEXT   // 操作说明文件
  }, {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
      freezeTableName: true
    });

  Device.register = async function (fields) {
    return await this.create(fields);
  }

  Device.getOneByArgs = function (params, exclude) {
    return this.findOne({
      where: params,
      attributes: {
        exclude: exclude.split(',')
      }
    })
  }

  // 查询列表
  Device.getList = function ({ params, page, pageSize }) {
    if (!page && !pageSize) {
      return this.findAndCountAll({
        where: params,
        include: [{
          model: app.model.User,
          where: { id: app.Sequelize.col('device.userId') }
        }, {
          model: app.model.DeviceType,
          where: { id: app.Sequelize.col('device.type') }
        }]
      })
    }
    page = page || PAGE
    pageSize = pageSize || PAGESIZE
    return this.findAndCountAll({
      where: params,
      offset: (page - 1) * pageSize,
      limit: pageSize,
      include: [{
        model: app.model.User,
        where: { id: app.Sequelize.col('device.userId') }
      }]
    })
  }

  Device.deleteByArgs = function (args) {
    return this.destroy({
      where: args
    })
  }

  Device.updateById = function (id, fields) {
    return this.update(fields, {
      where: { id: id }
    })
  }

  Device.updateByArgs = function (fields, params) {
    return this.update(fields, {
      where: params
    })
  }

  Device.associate = function () {
    app.model.Device.belongsTo(app.model.User, {
      constraints: false,
      foreignKey: 'userId'
    })
    app.model.Device.belongsTo(app.model.DeviceType, {
      constraints: false,
      foreignKey: 'type'
    })
  }

  return Device;
};
