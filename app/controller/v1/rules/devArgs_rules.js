exports.showRule = {
  id: { type: 'string', required: true }
};

exports.createRule = {
  name: { type: 'string', required: true },
  deviceId: { type: 'integer', required: true }
}
