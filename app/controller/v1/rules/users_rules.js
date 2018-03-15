exports.loginRule = {
  email: { type: 'email', required: true },
  password: { type: 'string', required: true }
};

exports.showRule = {
  id: { type: 'string', required: true }
};

exports.createRule = {
  name: { type: 'string', required: true },
  email: { type: 'email', required: true },
  password: { type: 'string', required: true }
}

