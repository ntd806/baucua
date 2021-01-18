'use strict';
const Main = require('./AllModel');


module.exports = class User extends Main {

  constructor() {
    super();
    this.mUser = this.mainUser();
      // users.hasMany(models.bankaccounts, {as: 'bankaccounts' })
      // users.hasMany(models.matcheshistory, {as: 'matcheshistory' })
      // users.hasMany(models.transfershistory, {as: 'transfershistory' })
      // users.belongsTo(models.permissions, { foreignKey: 'permission_id', as: 'permission' })

  }

  createUser(data){
    return this.mUser.create(data);
  }

  async getAccountByFB(fbUID){
    return await this.mUser.findAll({
      where:{
        fbUID: fbUID
      }
    });
  }
  async getAccountByGG(gg_email){
    return await this.mUser.findAll({
      where:{
        gg_email: gg_email
      }
    });
  }
  async login(data){
    var result;
    if(data.fbUID){
      result = await this.mUser.findAll({
        where:{
          fbUID: data.fbUID
        }
      });
    } else {
      result = await this.mUser.findAll({
        where:{
          gg_email: data.gg_email
        }
      });
    }
    return result[0];
  }
};
