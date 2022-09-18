const dbConfig = require("../config/db.config.js");
// const mysql = require('pg-promise');
const { Pool, Client } = require('pg')
require('dotenv').config();


export async function initialize(){
    const Sequelize = require("sequelize");
    const env = process.env.ENV || 'development';
    // const { host, port, username, password, database } = dbConfig['development'];
    //   const connection = await mysql.createConnection({ host, port, user:username, password });
    //   await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);

    // const connectionString = 'postgresql://'+dbConfig[env].username+':'+dbConfig[env].password+'@'+dbConfig[env].host+':'+dbConfig[env].port+'/'+dbConfig[env].database+''
    // const pool = new Pool({
    //     host,
    //     port,
    //     user:username,
    //     password,
    //     keepAlive: true
    // })
    // const res = await pool.query(`CREATE DATABASE IF NOT EXISTS ${database};`)
    // console.log(res)
    let sequelize
    if (dbConfig[env].use_env_variable) {
        sequelize = new Sequelize(process.env[dbConfig[env].use_env_variable], dbConfig);
    } else {
      sequelize = new Sequelize(dbConfig[env].database, dbConfig[env].username, dbConfig[env].password, {
          host: dbConfig[env].host,
          dialect: dbConfig[env].dialect,
          operatorsAliases: 0,
          logging: false,
          pool: {
          max: dbConfig[env].pool.max,
          min: dbConfig[env].pool.min,
          acquire: dbConfig[env].pool.acquire,
          idle: dbConfig[env].pool.idle
          }
      })
    }

  const db = {};

  db.Sequelize = Sequelize;
  db.sequelize = sequelize;

//   db.test = require("./test.model.js")(sequelize, Sequelize);
  db.users =require("./users.model.js")(sequelize, Sequelize);

  Object.keys(db).forEach(function (modelName) {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
  });
  return db;
}

// export default initialize;