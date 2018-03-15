'use strict';

const Controller = require('egg').Controller;
const devArgs_rules = require('./rules/devArgs_rules')

class DevArgsController extends Controller {

  // get /devArgs
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
    ctx.body = await ctx.model.DeviceArg.getList({params, ...pageList})
  }

  // get /devArgs/:id
  async show() {
    const ctx = this.ctx
    ctx.validate(devArgs_rules.showRule, ctx.params)
    ctx.body = await ctx.model.DeviceArg.getOneByArgs({id: ctx.params.id}, '')
  }

  // post /devArgs
  async create() {
    const ctx = this.ctx
    ctx.validate(devArgs_rules.createRule)
    const devArg = await ctx.model.DeviceArg.register(ctx.request.body)
    ctx.body = devArg
    ctx.status = 201
  }
  
  // put /devArgs/:id
  async update(){
    const ctx = this.ctx
    ctx.validate(devArgs_rules.showRule, ctx.params)
    delete ctx.request.body.id
    await ctx.model.DeviceArg.updateById(ctx.params.id, ctx.request.body)
    ctx.status = 204
  }

  // delete /devArgs/:id
  async destroy(){
    const ctx = this.ctx
    ctx.validate(devArgs_rules.showRule, ctx.params)
    await ctx.model.DeviceArg.deleteByArgs({id: ctx.params.id})
    ctx.status = 204
  }

}

module.exports = DevArgsController;
