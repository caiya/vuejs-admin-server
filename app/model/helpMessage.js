'use strict'
const [PAGE, PAGESIZE] = [1, 10]    // 当前页，页大小默认值
module.exports = app => {
  const { STRING, INTEGER, DATE, BOOLEAN, TEXT, FLOAT } = app.Sequelize;

  const HelpMessage = app.model.define('helpMessage', {
    content: TEXT,    // 消息内容
    deviceId: INTEGER,   // 设备id
    hasDeal: BOOLEAN,   // 是否已处理
    dealContent: TEXT,   // 处理内容
    dealTime: DATE,   // 处理时间
    dealUserId: INTEGER,   // 处理人
  }, {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    freezeTableName: true
  });

  HelpMessage.register = async function (fields) {
    return await this.create(fields)
  }
  
  HelpMessage.getOneByArgs = function (params, exclude) {
    return this.findOne({
      where: params,
      attributes: {
        exclude: exclude.split(',')
      }
    })
  }

  // 查询列表
  HelpMessage.getList = function ({ params, page, pageSize }) {
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

  HelpMessage.deleteByArgs = function(args) {
    return this.destroy({
      where: args
    })
  }

  HelpMessage.updateById = function(id, fields) {
    return this.update(fields, {
      where: { id: id}
    })
  }

  return HelpMessage;
};
