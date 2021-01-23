'use strict';
const Main = require('./AllModel');
const TransferHistory = require('./transfershistory');
let transferHistory = new TransferHistory();
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

    async getBankAccountByUserId(userId) {
        let backAccount = await this.mBankAccount.findOne({
            where: {
                user_id: userId,
            }
        });
        return backAccount ? backAccount.dataValues : null;
    }

    createBankAccount(data){
        return new Promise((resolve, reject) => {
            try {
                let bankAccount = this.mBankAccount.create(data);
                resolve(bankAccount)
            } catch (e) {
                reject(e)
            }
        })
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
    if(result[0]){
      return result[0].is_block;
    }else{
      return -1;
    }
  }

  async addAmount(user_id, amount){
    await this.mBankAccount.update(
      { amount: amount },
      { where: { user_id: user_id } }
    )
  }

    getInstance() {
        return this.mBankAccount;
    }

    async getUserWallets(user_id) {
        return await this.mBankAccount.findAll({
            where: {
                user_id: user_id
            },
            attributes: [['id', 'bankaccount_id'], 'amount', 'status']
        })
    }

    async transfer(userFrom, userTo, bankUserTo, amountTransfer) {
        await this.mBankAccount.update(
            { amount: bankUserTo.amount + amountTransfer },
            { where: { id: bankUserTo.id } }
        )
        let data = {};
        data.user_id = userFrom.id;
        data.bank_acc_id = bankUserTo.id;
        data.summand = amountTransfer;
        data.destination_id = userTo.id;
        data.arrival_id = userFrom.id;
        data.status = 1;
        let transfer = await transferHistory.createTransferHistory(data)
        return await transferHistory.getTransferHistoryById(transfer.id)
    }
}
