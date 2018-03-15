'use strict';

const Controller = require('egg').Controller;
const devices_rules = require('./rules/devices_rules')

const {deviceAddPub, deviceDelPub, deviceUpdatePub} = require('../../../postal/pub')

class DevicesController extends Controller {

  // get /devices
  async index() {
    const ctx = this.ctx
    const params = ctx.request.query
    let pageList = {}
    if (params.page) {
      pageList.page = parseInt(params.page)
      delete params.page
    }
    if (params.pageSize) {
      pageList.pageSize = parseInt(params.pageSize)
      delete params.pageSize
    }
    ctx.body = await ctx.model.Device.getList({params, ...pageList})
  }

  // get /devices/:id
  async show() {
    const ctx = this.ctx
    ctx.validate(devices_rules.showRule, ctx.params)
    ctx.body = await ctx.model.Device.getOneByArgs({id: ctx.params.id}, '')
  }

  // post /devices
  async create() {
    const ctx = this.ctx
    ctx.validate(devices_rules.createRule)
    const deviceArgs = ctx.request.body.args    // 取到设备参数
    delete ctx.request.body.args  // 删除设备参数字段
    try {
      let result = await ctx.app.model.transaction(t => {
        return ctx.model.Device.create(ctx.request.body ,{transaction: t}).then(device => {
          const creates = []
          deviceArgs.forEach(item => {
            creates.push({
              name: item.name,
              desc: item.desc,
              deviceId: device.id
            })
          })
          return ctx.model.DeviceArg.bulkCreate(creates, {transaction: t})
        })
      })
      result = await ctx.model.Device.findById(result[0].deviceId)

      // 發佈一個訂閲
      deviceAddPub(result.code)

      ctx.body = result
      ctx.status = 201
    } catch (err) {
      ctx.throw(500, err.message)
    }
  }
  
  // put /devices/:id
  async update(){
    const ctx = this.ctx
    const device = await ctx.model.Device.getOneByArgs({id: ctx.params.id}, '')
    ctx.validate(devices_rules.showRule, ctx.params)
    delete ctx.request.body.id
    delete ctx.request.body.args
    await ctx.model.Device.updateById(ctx.params.id, ctx.request.body)

    // 發佈訂閲
    if (ctx.request.body.code !== device.code) {
      deviceUpdatePub(device.code, ctx.request.body.code)
    }

    ctx.status = 204
  }

  // delete /devices/:id
  async destroy(){
    const ctx = this.ctx
    const device = await ctx.model.Device.getOneByArgs({id: ctx.params.id}, '')
    ctx.validate(devices_rules.showRule, ctx.params)
    try {
      await ctx.app.model.transaction(t => {
        // 删除设备
        return ctx.model.Device.deleteByArgs({id: ctx.params.id}, {transaction: t}).then(res => {
          // 删除设备下的所有参数
          return ctx.model.DeviceArg.destroy({
            where: {
              deviceId: ctx.params.id
            }
          })
        })
      })

      // 發佈訂閲
      deviceDelPub(device.code)

      ctx.status = 204
    } catch (err) {
      ctx.throw(500, err.message)
    }
  }
  
}

module.exports = DevicesController;
