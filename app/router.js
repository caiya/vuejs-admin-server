'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;

  router.post('/api/v1/users/login', controller.v1.users.login);
  router.post('/api/v1/users/logout', controller.v1.users.logout);

  router.post('/api/v1/tools/upload', controller.v1.tools.upload);
  router.resources('devTypes', '/api/v1/devTypes', controller.v1.devTypes);
  router.resources('devArgs', '/api/v1/devArgs', controller.v1.devArgs);
  router.resources('users', '/api/v1/users', controller.v1.users);
  router.resources('devices', '/api/v1/devices', controller.v1.devices);
  router.resources('messages', '/api/v1/messages', controller.v1.messages);
  router.resources('helpMessages', '/api/v1/helpMessages', controller.v1.helpMessages);
  router.resources('argsMessages', '/api/v1/argsMessages', controller.v1.argsMessages);
  
};
