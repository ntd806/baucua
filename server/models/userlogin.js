'use strict';
const Main = require('./AllModel');


module.exports = class UserLogin extends Main {

  constructor() {
    super();
    this.mUserLogin = this.mainUserLogin();
  }

  /**
   * getUsersHistory
   * 
   * @param datetime date
   * @param string m/d/y
   */
  async getUsersHistory(data){
    console.log(data);
    return await this.mUserLogin.findAll({
      where: {
        login_at: data.date,
      },
      order: [
        ['created_at', 'DESC']
      ],
      limit: 10
    });
  }
}