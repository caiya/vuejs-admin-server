'use strict';

module.exports = appInfo => {
  const config = exports = {
    static: { // 配置静态文件请求
      prefix: '/',
    },
    view: {
      defaultViewEngine: 'nunjucks',
      mapping: {
        '.html': 'nunjucks',
      },
    },
    oAuth2Server: {
      debug: true,
      grants: ['password', 'authorization_code', 'refresh_token']
    },
    sequelize: {
      dialect: 'mysql', // support: mysql, mariadb, postgres, mssql
      database: 'oAuthCenter',
      host: '216.250.107.28',
      port: '3306',
      username: 'oAuthCenter',
      password: 'PT5Gh6zdAK'
    },
    security: {
      csrf: {
        enable: false
      },
    },
    multipart: {
      fileSize: '20mb',
      whitelist: [
        '.png',
        '.jpg',
        '.jpeg'
      ]
    },
    auth: {
      enable: true,
      match(ctx) {
        // 只有 api 才开启
        const reg = /api\/v1/i;     // 包含api
        const regExcept = /users\/login|api\/v1\/tools/i     // 不包含users/login接口
        return reg.test(ctx.request.path) && !regExcept.test(ctx.request.path)
      },
      secret: 'shared-secret'
    },
    errorHandler: {
      enable: true,
      match(ctx) {
        // 只有 api 才开启
        const reg = /api\/v1/i;     // 包含api
        return reg.test(ctx.request.path);
      }
    },
    mqtt: {
      url: 'mq.tongxinmao.com:18830/web',
      options: {
        
      }
    },
    cors: {
      origin: '*',
      allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
    }
  };

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1513142797863_8350';

  // add your config here
  config.middleware = ['errorHandler', 'auth'];

  return config;
};

