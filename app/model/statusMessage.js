'use strict'
const [PAGE, PAGESIZE] = [1, 10]    // 当前页，页大小默认值
module.exports = app => {
  const { STRING, INTEGER, DATE, TEXT, FLOAT } = app.Sequelize;

  const StatusMessage = app.model.define('statusMessage', {
    status: STRING,    // 当前状态
    deviceId: INTEGER,   // 设备id
  }, {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    freezeTableName: true
  });
  
  StatusMessage.register = async function (fields) {
    return await this.create(fields)
  }
  
  StatusMessage.getOneByArgs = function (params, exclude) {
    return this.findOne({
      where: params,
      attributes: {
        exclude: exclude.split(',')
      }
    })
  }

  // 查询列表
  StatusMessage.getList = function ({ params, page, pageSize }) {
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

  StatusMessage.deleteByArgs = function(args) {
    return this.destroy({
      where: args
    })
  }

  StatusMessage.updateById = function(id, fields) {
    return this.update(fields, {
      where: { id: id}
    })
  }

  StatusMessage.findOrCreateOne = function(fields, defaults) {
    return this.findOrCreate({
      where: fields,
      defaults: {...defaults}
    })
  }

  return StatusMessage;
};
