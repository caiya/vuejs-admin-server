'use strict'

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const AuthorizationCode = app.model.define('authorizationCode', {
    code: STRING,
    expiresAt: DATE,
    redirectUri: STRING,
    scope: STRING,
    clientId: STRING,
    userId: { type: INTEGER, allowNull: false }
  }, {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
      freezeTableName: true
    });

  AuthorizationCode.saveAuthorizationCode = async function (code, client, user) {
    return await this.create({
      code: code.authorizationCode,
      expiresAt: code.expiresAt,
      redirectUri: code.redirectUri,
      scope: code.scope || '',
      clientId: client.id,
      userId: user.id
    })
  }

  AuthorizationCode.queryAuthorizationCode = async function(params) {
    return await this.findOne({
      where: params
    })
  }

  AuthorizationCode.delAuthorizationCode = async function(code) {
    return await this.destroy({
      where: {
        code: code
      }
    })
  }

  return AuthorizationCode;
};
