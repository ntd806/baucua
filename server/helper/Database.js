const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// const sequelize = new Sequelize('database_development', 'root', '', {
//   host: 'localhost',
//   dialect: 'mysql',
//   logging: false,
//   timezone: '+07:00'
// });

module.exports = sequelize;