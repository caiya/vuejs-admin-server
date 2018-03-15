'use strict';

const Controller = require('egg').Controller;
const devTypes_rules = require('./rules/devTypes_rules')

class DevTypesController extends Controller {

  // get /devTypes
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
    ctx.body = await ctx.model.DeviceType.getList({params, ...pageList})
  }

  // get /devTypes/:id
  async show() {
    const ctx = this.ctx
    ctx.validate(devTypes_rules.showRule, ctx.params)
    ctx.body = await ctx.model.DeviceType.getOneByArgs({id: ctx.params.id}, '')
  }

  // post /devTypes
  async create() {
    const ctx = this.ctx
    ctx.validate(devTypes_rules.createRule)
    const devType = await ctx.model.DeviceType.register(ctx.request.body)
    ctx.body = devType
    ctx.status = 201
  }
  
  // put /devTypes/:id
  async update(){
    const ctx = this.ctx
    ctx.validate(devTypes_rules.showRule, ctx.params)
    delete ctx.request.body.id
    await ctx.model.DeviceType.updateById(ctx.params.id, ctx.request.body)
    ctx.status = 204
  }

  // delete /devTypes/:id
  async destroy(){
    const ctx = this.ctx
    ctx.validate(devTypes_rules.showRule, ctx.params)
    await ctx.model.DeviceType.deleteByArgs({id: ctx.params.id})
    ctx.status = 204
  }

}

module.exports = DevTypesController;
