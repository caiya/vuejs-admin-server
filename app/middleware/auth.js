'use strict'

// 授权拦截中间件
// module.exports = options => {
//   return async function auth(ctx, next) {
//     // 没有传token，直接返回错误
//     const token = ctx.header['authorization']
//     if (!token) {
//       ctx.body = {
//         error: 'unauthorized_request',
//         error_description: 'Unauthorized request: no authentication given'
//       }
//       return
//     }
//     return ctx.app.oAuth2Server.authenticate(options)(ctx, next)
//   }
// }

module.exports = require('koa-jwt')