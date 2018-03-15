'use strict';

const Controller = require('egg').Controller;
const argsMessages_rules = require('./rules/argsMessages_rules')

class ArgsMessageController extends Controller {

  // get /argsMessages
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
    ctx.body = await ctx.model.ArgsMessage.getList({params, ...pageList})
  }

  // get /argsMessages/:id
  async show() {
    const ctx = this.ctx
    ctx.validate(argsMessages_rules.showRule, ctx.params)
    ctx.body = await ctx.model.ArgsMessage.getOneByArgs({id: ctx.params.id}, '')
  }

}

module.exports = ArgsMessageController;
