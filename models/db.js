const Sequelize = require('sequelize');
//conexão com o banco
const sequelize = new Sequelize('u274908554_INportifolio', 'u274908554_in', 'nad$u0oY6?', {
    host: 'sql812.main-hosting.eu',
    dialect: 'mysql',
    dialectModule: require('mysql2')
});
module.exports={
    Sequelize: Sequelize,
    sequelize:sequelize
}
