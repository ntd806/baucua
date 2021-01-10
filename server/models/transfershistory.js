const Main = require('./AllModel');


module.exports = class TransferHistory extends Main {

  constructor() {
    super();
    this.mTransferHistory = this.mainTransferHistory();
  }

  createTransferHistory(data){
    return this.mTransferHistory.create(data);
  }

}
