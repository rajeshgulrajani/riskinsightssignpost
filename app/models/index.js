const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.signpostSnapshot = require("./signpost.snapshot.js")(sequelize, Sequelize);
db.signPost = require("./signpost.js")(sequelize, Sequelize);

db.signPost.hasMany(db.signpostSnapshot, {foreignKey: 'signpost_id'})
db.signpostSnapshot.belongsTo(db.signPost,  {foreignKey: 'signpost_id'})

module.exports = db;