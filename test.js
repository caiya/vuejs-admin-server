const postal = require('postal')
const mqtt = require('mqtt')

const client = mqtt.connect('mqtt://127.0.0.1:1883', {})

postal.publish({
    channel: "devices",
    topic: "item.add",
    data: {
        code: "AZDTF4346",
        qty: 21
    }
})

setInterval(()=> {
    console.log('已發佈消息')
    client.publish('AZDTF4346', 'this message is from test.js' + Math.random())
}, 5000)