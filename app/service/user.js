const Service = require('egg').Service;
const bcrypt = require('bcryptjs');

class UserService extends Service {
  hashPassword(password) {
    const salt = bcrypt.genSaltSync(10)
    return bcrypt.hashSync(password, salt)
  }

  compareSync(password, hashedPassword) {
    return bcrypt.compareSync(password, hashedPassword)
  }
}

module.exports = UserService;
