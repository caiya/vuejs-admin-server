const {msgNoticePub} = require('../../postal/pub')

module.exports = {
  schedule: {
    interval: '10s', // 1 分钟间隔
    immediate: true,
    type: 'all', // 指定所有的 worker 都需要执行
  },
  async task(ctx) {
    console.log('开始更新设备状态....')
    let params = {status: 'online'}   // 查询所有在线的设备
    const status = await ctx.model.StatusMessage.getList({params})
    if (!status.count) return
    const onlineIds = [0]
    status.rows.forEach(({dataValues}) => {
      const time1 = Date.parse(new Date(dataValues.updatedAt)) / 1000    // 设备上次在线时间，判断距离当前时间是否超过两小时，是的话更改设备状态为离线
      if (Date.now() / 1000 - time1 + 8*3600 <= 2*3600) {    // 如果超过两小时认为设备离线
        onlineIds.push(dataValues.deviceId)
      }
    })
    await ctx.model.Device.updateByArgs({status: 'online'}, {
      id: {
        in: onlineIds
      }
    })
    params = {
      id: {
        notIn: onlineIds
      }
    }, deviceHash = {}
    await ctx.model.Device.updateByArgs({status: 'offline'}, params)
    
    const allDevices = await ctx.model.Device.getList({params})
    if (!allDevices.count) reutrn
    allDevices.rows.forEach(item => {
      deviceHash[item.id] = item
    })
    for (const key in deviceHash) {
      if (deviceHash.hasOwnProperty(key)) {
        const element = deviceHash[key]
        msgNoticePub({
          type: 'deviceOffline',
          msg: `${element.user.email}的设备：${element.name}已与系统失去链接，请持续关注`
        })
      }
    }
  },
};