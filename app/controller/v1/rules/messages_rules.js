exports.showRule = {
  id: { type: 'string', required: true }
};

exports.createRule = {
  type: { type: 'string', required: true },
  content: { type: 'string', required: true }
}
