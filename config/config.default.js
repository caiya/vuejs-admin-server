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
    sequelize: {
      dialect: 'mysql', // support: mysql, mariadb, postgres, mssql
      database: 'oauth2',
      host: '47.93.13.160',
      port: '3306',
      username: 'caiya',
      password: 'CaiYa928@aliyun.com',
    },
    security: {
      csrf: {
        enable: false,
      },
    },
    multipart: {
      fileSize: '20mb',
      whitelist: [
        '.png',
        '.jpg',
        '.jpeg',
      ],
    },
    mqtt: {
      url: 'mq.tongxinmao.com:18830/web',
      options: {

      },
    },
    cors: {
      origin: '*',
      allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
    },
    auth: {
      secret: 'awdaw34khjdabhgdawd',
    },
  };

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1513142797863_8350';

  // add your config here
  // config.middleware = ['errorHandler', 'auth'];

  return config;
};

