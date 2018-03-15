'use strict';

const Controller = require('egg').Controller;
const path = require('path');
const fs = require('fs');
const sendToWormhole = require('stream-wormhole');

class ToolsController extends Controller {

  // 文件上传
  async upload() {
    const ctx = this.ctx;
    const stream = await ctx.getFileStream();
    let url
    try {
      const fileName = process.version + '-' + Date.now() + '-' + stream.filename
      const filepath = path.join(ctx.app.config.static.dir, 'upload/' + fileName)
      await saveStream(stream, filepath)
      url = 'upload/' + fileName
    } catch (err) {
      await sendToWormhole(stream)
      throw err
    }
    ctx.body = {
      url: url
    }
  }

  async test() {
    this.ctx.body = await this.ctx.model.User.findAll({})
  }
}

module.exports = ToolsController;


function saveStream(stream, filepath) {
  return new Promise((resolve, reject) => {
    const ws = fs.createWriteStream(filepath)
    stream.pipe(ws)
    ws.on('error', reject)
    ws.on('finish', resolve)
  })
}