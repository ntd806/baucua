'use strict';
const Main = require('./AllModel');


module.exports = class MatchesHistory extends Main {

  constructor() {
    super();
    this.mMatchesHistory = this.mainMatchesHistory();
  }

  async getMatchesHistory(data) {
    return await this.mMatchesHistory.findAll({
      where: {
        user_id: data.user_id,
      },
      order: [
        ['created_at', 'DESC']
      ],
      limit: 10
    });
  }

  async createMatchesHistory(data){
    await this.mMatchesHistory.create(data);
  }
  
}