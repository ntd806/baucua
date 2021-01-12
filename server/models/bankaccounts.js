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
}