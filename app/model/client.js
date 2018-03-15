'use strict'

module.exports = app => {
  const { STRING} = app.Sequelize;

  const Client = app.model.define('client', {
    clientId: {type: STRING, unique: true},
    clientSecret: STRING, 
    redirectUri: STRING,
    grants: STRING
  }, {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    freezeTableName: true
  });
  
  Client.getClient = async function(clientId, clientSecret) {
    let params = {
      clientId: clientId
    }
    if (clientSecret) {
      params.clientSecret = clientSecret
    }
    return this.findOne({
      where: params
    })
  }

  Client.queryClient = async function(params) {
    return this.findOne({
      where: params,
      attributes: {
        exclude: ['clientSecret']
      }
    })
  }

  Client.add = async function (fields) {
    return this.create(fields);
  }

  return Client;
};
