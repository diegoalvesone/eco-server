const { Sequelize } = require("sequelize");
const DB = 'railway';
const USER = 'root';
const PASSWORD = 'kLQAaW2doPgo5ejWbly0';
const HOST = 'containers-us-west-128.railway.app';
const DIALECT = 'mysql';
const PORT = 6438;
// Configuração da conexão com o banco de dados
const connection = new Sequelize(
  DB,
  USER,
  PASSWORD,
  {

    host: HOST, // Host do banco de dados
    dialect: DIALECT, // Dialeto do banco de dados (MySQL)
    port: PORT
  }
);

// Função que faz a conexão com o banco de dados
async function authenticate(connection) {
  try {

    await connection.authenticate();
    console.log("Conexão estabelecida com sucesso!");
  } catch (err) {
    console.log(HOST);
    console.log("Um erro inesperado aconteceu: ", err);
  }
}

module.exports = { connection, authenticate }