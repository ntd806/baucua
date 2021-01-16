'use strict';
const Main = require('./AllModel');


module.exports = class TransferHistory extends Main {

  constructor() {
    super();
    this.mTransferHistory = this.mainTransferHistory();
  }

  async createTransferHistory(data){
    return this.mTransferHistory.create(data);
  }

  async getTransferHistory(data){
    return await this.mTransferHistory.findAll({
      where: {
        user_id: data.user_id,
      },
      order: [
        ['created_at', 'DESC']
      ],
      limit: 10
    });
  }
}
