'use strict';
const Main = require('./AllModel');
module.exports = class BankAccount extends Main {
    constructor() {
        super();
        this.bankAccount = this.mainBankAccount();
    }

    getInstance() {
        return this.bankAccount;
    }

    async getUserWallets(user_id) {
        return await this.bankAccount.findAll({
            where: {
                user_id: user_id
            },
            attributes: [['id', 'bankaccount_id'], 'amount', 'status']
        })
    }
  async getBankAccount(data){
    return await this.mBankAccount.findAll({
      where: {
        user_id: data.user_id,
      }
    });
  }

  async getAmount(user_id){
    let result = await this.mBankAccount.findAll({
      where: {
        user_id: user_id,
      }
    });
    return result[0].amount;
  }

  async getIsBlock(user_id){
    let result = await this.mBankAccount.findAll({
      where: {
        user_id: user_id,
      }
    });
    return result[0].is_block;
  }

  async addAmount(user_id, amount){
    await this.mBankAccount.update(
      { amount: amount },
      { where: { user_id: user_id } }
    )
  }
}
