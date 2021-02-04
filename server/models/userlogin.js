'use strict';
const Main = require('./AllModel');
const { Op } = require('sequelize');
const sequelize= require('sequelize');


module.exports = class UserLogin extends Main {

  constructor() {
    super();
    this.mUserLogin = this.mainUserLogin();
    this.mUser = this.mainUser();
    // this.Op = Sequelize.Op;
    this.mUserLogin.hasOne(this.mUser, {foreignKey: 'id', sourceKey: 'user_id'});
  }

  /**
   * getUsersHistory
   *
   * @param datetime date
   * @param string m/d/y
   */
  async getUsersHistory(data) {
    let {page = 1, limit = 10} = data;
    const startDate = new Date(data.startDate);
    const endDate = new Date(data.endDate);
    // return null;
    return await this.mUserLogin.findAndCountAll({
      // attributes: ['id', 'user_id', 'login_at', [sequelize.fn('sum', sequelize.col('time')), 'count_time']],
      include: [
        {
          model: this.mUser,
          attributes: ['name']
        }
      ],
      where: [{
        login_at: {
          [Op.between]: [startDate, endDate]
        },
      }],
      // group: ['user_id'],
      limit: limit,
      offset: +(limit * (page - 1)),
      order: [
        ['login_at', 'ASC']
      ],
    });
  }

  async getLoginUsersCurrentDateByUserId(userId) {
    const TODAY_START = new Date().setHours(0, 0, 0, 0);
    const NOW = new Date();
    let loginUser = await this.mUserLogin.findOne(
        {
          where: [{
            created_at: {
              [Op.gt]: TODAY_START,
              [Op.lt]: NOW
            },
            user_id: userId
          }],
        }
    )
    return loginUser;
  }

   createLoginUsers(data) {
    return new Promise(async (resolve, reject) => {
      try {
        let loginUser = await this.mUserLogin.create(data);
        resolve(loginUser);
      } catch (e) {
        reject(e)
      }
    })
  }

  updateLoginUsersById(id, valueUpdate) {
      return new Promise(async (resolve, reject) => {
        try {
          await this.mUserLogin.update(valueUpdate, {
            where:{
              id: id
            }
          });
          resolve();
        } catch (e) {
          reject(e)
        }
      })
  }

}

