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
    return new Promise(async (resolve, reject) => {
       try {
         let user = await this.mUser.create(data);
         resolve(user);
       } catch (e) {
         reject(e)
       }
    })
    // return this.mUser.create(data);
  }

  updateUser(id, dataEdit){
    return new Promise(async (resolve, reject) => {
      try {
        let valueUpdate = {};

        if (dataEdit.name) {
          valueUpdate.name = dataEdit.name
        }
        if (dataEdit.phone) {
          valueUpdate.phone = dataEdit.phone
        }
        if (dataEdit.address) {
          valueUpdate.address = dataEdit.address
        }
        if (typeof dataEdit.status === 'number') {
          valueUpdate.status = dataEdit.status;
        }

        let userUpdate = await this.mUser.update(valueUpdate, {
          where:{
            id: id
          }
        });
        console.log(userUpdate);
        resolve(userUpdate);
      } catch (e) {
        reject(e)
      }
    })
  }

  async getUserById(id) {
    let user = await this.mUser.findOne({
      where:{
        id: id
      }
    });

    if (user) {
      let result = user.dataValues;
      delete result.password;
      return result;
    } else {
      return  null;
    }
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
