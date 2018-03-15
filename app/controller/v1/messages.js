'use strict';

const Controller = require('egg').Controller;
const messages_rules = require('./rules/messages_rules')

class MessagesController extends Controller {

  // get /messages
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
    ctx.body = await ctx.model.Message.getList({params, ...pageList})
  }

  // get /messages/:id
  async show() {
    const ctx = this.ctx
    ctx.validate(messages_rules.showRule, ctx.params)
    ctx.body = await ctx.model.Message.getOneByArgs({id: ctx.params.id}, '')
  }

  // post /messages
  async create() {
    const ctx = this.ctx
    ctx.validate(messages_rules.createRule)
    const message = await ctx.model.Message.register(ctx.request.body)
    ctx.body = message
    ctx.status = 201
  }
  
  // put /messages/:id
  async update(){
    const ctx = this.ctx
    ctx.validate(messages_rules.showRule, ctx.params)
    delete ctx.request.body.id
    await ctx.model.Message.updateById(ctx.params.id, ctx.request.body)
    ctx.status = 204
  }

  // delete /messages/:id
  async destroy(){
    const ctx = this.ctx
    ctx.validate(messages_rules.showRule, ctx.params)
    await ctx.model.Message.deleteByArgs({id: ctx.params.id})
    ctx.status = 204
  }

}

module.exports = MessagesController;
