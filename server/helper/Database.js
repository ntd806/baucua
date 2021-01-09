const Sequelize = require('sequelize');
const sequelize = new Sequelize('database_development', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false,
  timezone: '+07:00'
});

module.exports = sequelize;