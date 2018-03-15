'use strict'

module.exports = app => {
  const { STRING, INTEGER, DATE, TEXT } = app.Sequelize;

  const DeviceType = app.model.define('deviceType', {
    name: {type: STRING, unique: true, allowNull: false}   // 类别名称
  }, {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    freezeTableName: true
  });

  DeviceType.register = async function (fields) {
    return await this.create(fields)
  }
  
  DeviceType.getOneByArgs = function (params, exclude) {
    return this.findOne({
      where: params,
      attributes: {
        exclude: exclude.split(',')
      }
    })
  }

  // 查询列表
  DeviceType.getList = function ({ params, page, pageSize }) {
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

  DeviceType.deleteByArgs = function(args) {
    return this.destroy({
      where: args
    })
  }

  DeviceType.updateById = function(id, fields) {
    return this.update(fields, {
      where: { id: id}
    })
  }

  return DeviceType;
};
