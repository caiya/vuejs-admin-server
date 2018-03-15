'use strict'

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const RefreshToken = app.model.define('refreshToken', {
    refreshToken: {type: STRING, unique: true},
    refreshTokenExpiresAt: DATE,
    scope: STRING,
    clientId: STRING,
    userId: { type: STRING, allowNull: false }
  }, {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
      freezeTableName: true
    });

  RefreshToken.saveRefreshToken = async function (token, client, user) {
    await this.create({
        refreshToken: token.refreshToken,
        refreshTokenExpiresAt: token.refreshTokenExpiresAt,
        clientId: client.id,
        userId: user.id,
        scope: token.scope || ''
    })
  }
  
  RefreshToken.delRefreshToken = async function(token) {
    return await this.destroy({
      where: {
        refreshToken: token.refreshToken
      }
    })
  }

  RefreshToken.queryRefreshToken = async function(refreshToken) {
    return await this.findOne({
      where: {
        refreshToken: refreshToken
      }
    })
  }

  return RefreshToken;
};
