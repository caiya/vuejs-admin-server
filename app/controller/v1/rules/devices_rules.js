exports.showRule = {
  id: { type: 'string', required: true }
};

exports.createRule = {
  name: { type: 'string', required: true },
  args: {   // 设备的参数
    required: true,
    type: 'array'
  }
}

