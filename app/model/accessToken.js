'use strict'

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const AccessToken = app.model.define('accessToken', {
    accessToken: {type: STRING, unique: true},
    accessTokenExpiresAt: DATE,
    scope: STRING,
    clientId: STRING,
    userId: { type: STRING, allowNull: false }
  }, {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
      freezeTableName: true
    });

  AccessToken.getAccessToken = function (bearerToken) {
    return this.findOne({
      where: { accessToken: bearerToken }
    });
  }
  
  AccessToken.saveAccessToken = async function (token, client, user) {
    await this.create({
        accessToken: token.accessToken,
        accessTokenExpiresAt: token.accessTokenExpiresAt,
        clientId: client.id,
        userId: user.id,
        scope: token.scope || ''
    })
  }

  return AccessToken;
};
