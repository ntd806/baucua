'use strict';
const Main = require('./AllModel');


module.exports = class MatchesHistory extends Main {

  constructor() {
    super();
    this.mMatchesHistory = this.mainMatchesHistory();
  }

  async getMatchesHistory(data) {
    
    var result = await this.mMatchesHistory.findAll({
      where: {
        user_id: data.user_id,
      },
      order: [
        ['created_at', 'DESC']
      ],
      limit: 10
    });
    console.log(result);
    return result;
  }

  async getMatchesHistoryPagination(data, limit, offset) {
    let result = await this.mMatchesHistory.findAndCountAll({
      where: {
        user_id: data.user_id,
      },
      order: [
        ['created_at', 'DESC']
      ],
      limit: limit,
      offset: offset
    });
    return result;
  }

  async createMatchesHistory(data){
    await this.mMatchesHistory.create(data);
  }
  
}
