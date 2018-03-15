const mqtt = require('mqtt')
const postal = require('postal')
const moment = require('moment')

const {msgNoticePub} = require('./pub')

module.exports = app => {
    // 开始监听mqtt服务
    const client = mqtt.connect(app.config.mqtt.url, app.config.mqtt.options)

    client.on('connect', () => {
        console.log(`mqtt服务地址 ${app.config.mqtt.url} connected!`)
        postal.unsubscribe()
        // postal.subscribe({
        //     channel: "devices",
        //     topic: "item.add",
        //     callback: function (data, envelope) {
        //         client.subscribe(data.topic)     // 订阅设备的编号主题
        //         console.log('訂閲主題成功：', data.topic)
        //     }
        // })
        // postal.subscribe({
        //     channel: "devices",
        //     topic: "item.del",
        //     callback: function (data, envelope) {
        //         client.unsubscribe(data.topic)     // 取消订阅设备的编号主题
        //         console.log('取消訂閲主題成功：', data.topic)
        //     }
        // })
        // postal.subscribe({
        //     channel: "devices",
        //     topic: "item.update",
        //     callback: function (data, envelope) {
        //         client.unsubscribe(data.oldTopic)       // 取消舊的訂閲
        //         console.log('取消訂閲主題成功：', data.oldTopic)
        //         client.subscribe(data.topic)     // 再次订阅设备的编号主题
        //         console.log('訂閲主題成功：', data.topic)
        //     }
        // })

        // 订阅设备类主题
        client.subscribe('/devices/#');     // 发布主题消息时：/devices/设备编号即可

        // 动态给前端推送消息
        postal.subscribe({
            channel: "msg",
            topic: "item.notice",
            callback: function (data, envelope) {
                client.publish('msgNotice', JSON.stringify(data))       // 向前端发布消息
                console.log('向前端推送消息成功：', JSON.stringify(data))
            }
        })
    })

    client.on('error', err => {
        console.error('mqtt出错：', err)
        client.end()
        client.reconnect()      // 断开连接再次重连
    })

    client.on('message', async (topic, message = '') => {
        console.log('收到消息：', topic, ' -> ', message.toString())
        topic = topic.substring(9);
        message = message.toString()
        // 處理實時設備參數消息入庫：a:12|b:24|c:33
        if (!message) return
        const agrs = message.split('|')
        const device = await app.model.Device.getOneByArgs({ code: topic }, '')
        if (!device) return
        const deviceArgs = await app.model.DeviceArg.findAllArgs({ deviceId: device.id })
        if (!deviceArgs.length) return
        const deviceArgsHash = {}
        deviceArgs.forEach(item => {
            deviceArgsHash[item.name] = item
        })
        const inserts = []
        const now = moment().format('YYYYMMDD hh:mm:ss')
        agrs.forEach(item => {
            const argName = item.split(':')[0]
            const argValue = parseFloat(item.split(':')[1])
            // ArgsMessage 入庫
            if (deviceArgsHash[argName]) {
                inserts.push({
                    argsId: deviceArgsHash[argName].id,
                    deviceId: device.id,
                    argsValue: argValue || 0
                })
                // 判断参数是否超标，超标则发送参数超标通知消息
                if (argValue < parseFloat(deviceArgsHash[argName].argsLow)) {
                    msgNoticePub({
                        type: 'argsAlarm',       // 参数报警
                        msg: `设备编号：${device.code}的参数${argName}在${now}发生报警！报警值：${argValue}，参考值：${deviceArgsHash[argName].argsLow}`,
                    })
                }
                if (argValue > parseFloat(deviceArgsHash[argName].argsHigh)) {
                    msgNoticePub({
                        type: 'argsAlarm',       // 参数报警
                        msg: `设备编号：${device.code}的参数${argName}在${now}发生报警！报警值：${argValue}，参考值：${deviceArgsHash[argName].argsHigh}`,
                    })
                }
            }
        })
        // 批量入庫
        await app.model.ArgsMessage.bulkCreate(inserts)

        // 更新设备状态
        const statusMessage = (await app.model.StatusMessage.findOrCreateOne({
            deviceId: device.id,
            status: 'online'
        }, {}))[0]
        // 更新状态消息
        await app.model.StatusMessage.updateById(statusMessage.id, {
            status: 'online'
        })
    })
}
