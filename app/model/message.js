'use strict'
const [PAGE, PAGESIZE] = [1, 10]    // 当前页，页大小默认值
module.exports = app => {
  const { STRING, INTEGER, DATE, TEXT } = app.Sequelize;

  const Message = app.model.define('message', {
    type: STRING,   // 消息类别
    content: {type: TEXT},    // 消息内容
    deviceId: INTEGER   // 设备id
  }, {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    freezeTableName: true
  });

  Message.register = async function (fields) {
    return await this.create(fields)
  }
  
  Message.getOneByArgs = function (params, exclude) {
    return this.findOne({
      where: params,
      attributes: {
        exclude: exclude.split(',')
      }
    })
  }

  // 查询列表
  Message.getList = function ({ params, page, pageSize }) {
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

  Message.deleteByArgs = function(args) {
    return this.destroy({
      where: args
    })
  }

  Message.updateById = function(id, fields) {
    return this.update(fields, {
      where: { id: id}
    })
  }

  return Message;
};
