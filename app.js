module.exports = app => {
  app.beforeStart(async function() {
    await app.model.sync({ force: false });

    // init数据库操作
    const user = {
      name: 'admin',
      email: 'caiya928@aliyun.com',
      password: 'admin',
      age: 25,
      isAdmin: true,
    };
    if (!(await app.model.User.queryUser({ name: user.name }))) {
      await app.model.User.register(user);
    }

    if (!(await app.model.Client.queryClient({ clientId: 'website' }))) {
      await app.model.Client.add({
        clientId: 'website',
        clientSecret: new Date().getTime(),
        redirectUri: '/',
        grants: 'password,refresh_token',
      });
    }

    // 初始化设备类型表
    if (!(await app.model.DeviceType.count())) {
      const deviceTypes = [{ name: '光源设备' }, { name: '反应系统' }, { name: '测量仪器' }, { name: '其它设备' }];
      await app.model.DeviceType.bulkCreate(deviceTypes);
    }

    require('./postal/sub')(app);

  });

}
;
