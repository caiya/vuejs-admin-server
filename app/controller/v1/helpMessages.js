'use strict';

const Controller = require('egg').Controller;
const helpMessages_rules = require('./rules/helpMessages_rules')

class HelpMessagesController extends Controller {

  // get /helpMessages
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
    ctx.body = await ctx.model.HelpMessage.getList({params, ...pageList})
  }

  // get /helpMessages/:id
  async show() {
    const ctx = this.ctx
    ctx.validate(helpMessages_rules.showRule, ctx.params)
    ctx.body = await ctx.model.HelpMessage.getOneByArgs({id: ctx.params.id}, '')
  }

  // post /helpMessages
  async create() {
    const ctx = this.ctx
    ctx.validate(helpMessages_rules.createRule)
    const message = await ctx.model.HelpMessage.register(ctx.request.body)
    ctx.body = message
    ctx.status = 201
  }
  
  // put /helpMessages/:id
  async update(){
    const ctx = this.ctx
    ctx.validate(helpMessages_rules.showRule, ctx.params)
    delete ctx.request.body.id
    await ctx.model.HelpMessage.updateById(ctx.params.id, ctx.request.body)
    ctx.status = 204
  }

  // delete /helpMessages/:id
  async destroy(){
    const ctx = this.ctx
    ctx.validate(helpMessages_rules.showRule, ctx.params)
    await ctx.model.HelpMessage.deleteByArgs({id: ctx.params.id})
    ctx.status = 204
  }

}

module.exports = HelpMessagesController;
