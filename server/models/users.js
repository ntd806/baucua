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
    
    if(result){
      return result[0];
    }else{ 
      return 0;
    }
  }

  async getUser(user_id){
    var user = await this.mUser.findAll({
      where:{
        id: user_id
      }
    });
    if(user) {
      return user[0];
    } else{
      return 0;
    }
  }
  async editProfile(data){
    return await this.mUser.update(
      {
        name: data.name,
        address: data.address,
        phone: data.phone
      },
      { where: { id: data.user_id } }
    )
  }
  async updateRefreshToken(id, refreshToken){
    await this.mUser.update(
      {
        refreshToken: refreshToken
      },
      { where: { id: id } }
    )
  }
}