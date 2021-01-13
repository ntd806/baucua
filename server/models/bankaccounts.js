const Main = require('./AllModel');


module.exports = class BankAccount extends Main {

  constructor() {
    super();
    this.mBankAccount = this.mainBankAccount();
  }

  async getBankAccount(data){
    return await this.mBankAccount.findAll({
      where: {
        user_id: data.user_id,
      }
    });
  }

}
