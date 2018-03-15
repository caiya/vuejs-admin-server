'use strict';

const Controller = require('egg').Controller;
const users_rules = require('./rules/users_rules')

const moment = require('moment')

const {msgNoticePub} = require('../../../postal/pub')

class UsersController extends Controller {

  // post /login
  async login() {
    const ctx = this.ctx
    ctx.validate(users_rules.loginRule)
    const {email, password} = ctx.request.body
    const user = await ctx.model.User.getUserByArgs({email}, '')
    if (!user) {
      ctx.throw(404, 'email not found')
    }
    if (!(ctx.service.user.compareSync(password, user.hashedPassword))) {
      ctx.throw(404, 'password wrong')
    }
    delete user.dataValues.hashedPassword

    // 发送登录通知
    msgNoticePub({msg: `用户${user.email}在${moment().format('YYYYMMDD hh:mm:ss')}登录系统，点击查看用户信息`, type: 'login'})

    ctx.body = {
      user,
      token: await ctx.service.auth.sign(user)
    }
  }

  // 退出接口（只是用来退出时给其他用户发送通知）
  async logout() {
    const {email} = this.ctx.request.body
    msgNoticePub({msg: `用户${email}在${moment().format('YYYYMMDD hh:mm:ss')}退出系统，点击查看用户信息`, type: 'logout'})
    this.ctx.status = 200
  }

  // get /users
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
    ctx.body = await ctx.model.User.getList({params, ...pageList})
  }

  // get /users/:id
  async show() {
    const ctx = this.ctx
    ctx.validate(users_rules.showRule, ctx.params)
    ctx.body = await ctx.model.User.getUserByArgs({id: ctx.params.id}, 'hashedPassword,passwordResetToken,resetTokenExpires')
  }

  // post /users
  async create() {
    const ctx = this.ctx
    ctx.validate(users_rules.createRule)
    const user = await ctx.model.User.register(ctx.request.body)
    user && delete user.dataValues.hashedPassword
    ctx.body = user
    ctx.status = 201
  }
  
  // put /users/:id
  async update(){
    const ctx = this.ctx
    ctx.validate(users_rules.showRule, ctx.params)
    delete ctx.request.body.id
    if (ctx.request.body.password) {    // 如果传入了pasword
      ctx.request.body.hashedPassword = ctx.service.user.hashPassword(ctx.request.body.password)
      delete ctx.request.body.password
    }
    await ctx.model.User.updateById(ctx.params.id, ctx.request.body)
    ctx.status = 204
  }

  // delete /users/:id
  async destroy(){
    const ctx = this.ctx
    ctx.validate(users_rules.showRule, ctx.params)
    await ctx.model.User.deleteByArgs({id: ctx.params.id})
    ctx.status = 204
  }

}

module.exports = UsersController;
