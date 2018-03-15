/**
 * 各種postal通知
 */
const postal = require('postal')

// 設備新增發佈
exports.deviceAddPub = (topic) => {
    postal.publish({    // 動態讓客戶端訂閲
        channel: "devices",
        topic: "item.add",
        data: {
            topic,   // 設備code，即訂閲的主題
        }
    })
}

// 設備刪除發佈
exports.deviceDelPub = (topic) => {
    postal.publish({    // 動態讓客戶端訂閲
        channel: "devices",
        topic: "item.del",
        data: {
            topic,   // 設備code，即訂閲的主題
        }
    })
}

// 設備更新發佈
exports.deviceUpdatePub = (oldTopic, topic) => {
    postal.publish({    // 動態讓客戶端訂閲
        channel: "devices",
        topic: "item.update",
        data: {
            oldTopic,
            topic
        }
    })
}

// 用于发送各种浏览器通知
exports.msgNoticePub = (data) => {
    postal.publish({    // 動態讓客戶端訂閲
        channel: "msg",
        topic: "item.notice",
        data: {...data}         // 发送的消息 {msg: "xxx设备掉线了...."}
    })
}