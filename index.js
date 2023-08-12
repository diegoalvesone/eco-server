require("dotenv").config();
const express = require("express");
const { connection, authenticate } = require("./database/database");
const bcrypt = require("bcrypt");
const cors = require("cors");

const app = express();

authenticate(connection);// Estabelece a conecção com o banco MySQL
app.use(express.json());// Estabelece o uso do Express
app.use(cors());// Esrabelece a conecção da API com o FRONT
app.use(express.urlencoded({extended: true}))
//Rotas
const Administrador = require("./database/usuario");
const rotasConsumidores = require("./routes/Consumidores");
const rotasProdutos = require("./routes/Produtos");
const rotasEmpreendedores = require("./routes/Empreendedores");
const rotaLogin = require("./routes/Login");


// Juntar ao app as rotas dos arquivos

app.use(rotasProdutos);
app.use(rotasConsumidores);
app.use(rotasEmpreendedores);
app.use(rotaLogin);


// Escuta de eventos (listen)
app.listen(3001, async () => {
  // Gerar as tabelas a partir do model
  // Force = apaga tudo e recria as tabelas
  await connection.sync(); 
  console.log("Servidor rodando em http://localhost:3001/");

  // Checar se o admin já existe na base de dados
  const admin = await Administrador.findOne({
    where: { email: 'admin@email.com' },
  });
  // Crypto da senha
  const SALT_ROUNDS = 10;
  let senhaCrypto = '12345678'
  senhaCrypto = await bcrypt.hash(senhaCrypto, SALT_ROUNDS);

  if (!admin) {
    // Create the admin user if it doesn't exist

    await Administrador.create({
      nome: 'admin',
      email: 'admin@email.com',
      senha: senhaCrypto,
      tipo: 'administrador',
    });
  }
});
