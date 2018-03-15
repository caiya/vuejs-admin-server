'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;

  // OAuth controller
  app.get('/oauth2', controller.oauth.authorize);
  app.all('/oauth2/token', app.oAuth2Server.token(), 'oauth.token');   // 获取token
  app.all('/oauth2/authorize', app.oAuth2Server.authorize());      // 获取授权码
  app.all('/oauth2/authenticate', app.oAuth2Server.authenticate(), 'oauth.authenticate');    // 验证请求
  
  // rest接口
  router.post('/api/v1/users/login', controller.v1.users.login);
  router.post('/api/v1/users/logout', controller.v1.users.logout);
  router.post('/api/v1/tools/test', controller.v1.tools.test);
  router.post('/api/v1/tools/upload', controller.v1.tools.upload);
  router.resources('devTypes', '/api/v1/devTypes', controller.v1.devTypes);
  router.resources('devArgs', '/api/v1/devArgs', controller.v1.devArgs);
  router.resources('users', '/api/v1/users', controller.v1.users);
  router.resources('devices', '/api/v1/devices', controller.v1.devices);
  router.resources('messages', '/api/v1/messages', controller.v1.messages);
  router.resources('helpMessages', '/api/v1/helpMessages', controller.v1.helpMessages);
  router.resources('argsMessages', '/api/v1/argsMessages', controller.v1.argsMessages);
};
