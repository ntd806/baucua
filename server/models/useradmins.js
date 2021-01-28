'use strict';
const Main = require('./AllModel');


module.exports = class Option extends Main {

  constructor() {
    super();
    this.mOption = this.mainAdmin();
  }

  async getUserAdminByUsername(username) {
    return await this.mOption.findOne({
      where: {
        user_name: username
      }
    });
  }

  async updateTokenById(id, token) {
    await this.mOption.update(
        { token: token },
        { where: { id: id } }
    )
  }
}
