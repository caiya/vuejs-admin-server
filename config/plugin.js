'use strict';

// had enabled by egg
// exports.static = true;
exports.nunjucks = {
  enable: true,
  package: 'egg-view-nunjucks',
};

exports.sequelize = {
  enable: true,
  package: 'egg-sequelize'
}

exports.validate = {
  enable: true,
  package: 'egg-validate',
};

exports.cors = {
  enable: true,
  package: 'egg-cors',
};