'use strict';

const Controller = require('egg').Controller;

class OAuthController extends Controller {

  // 登录页
  async authorize() {
    const query = this.ctx.querystring
    await this.ctx.render('oauth/login.html', {query: query})
  }

  // 认证过的请求
  async authenticate() {
    this.ctx.body = {
      msg: 'successed!'
    }
  }

  // 返回token
  async token(){
    this.ctx.body = this.ctx.state.oauth.token
  }
}

module.exports = OAuthController;
