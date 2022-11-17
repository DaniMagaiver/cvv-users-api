import "reflect-metadata";
import cors from "cors";
import express from "express";
import database from "./database";
import routes from "./routes";

const app = express();
const door = process.env.EXPRESS_DOOR;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

console.log(`\nConectando a base de dados de usuários ⚆_⚆...\n`);
database
  .initialize()
  .then(() => {
    database.runMigrations();
    console.log(`\nConectado com sucesso a base de dados de usuário ~(￣▽￣)~*!\n`);
  })
  .catch((error) => {
    console.log(`\nHouve um erro ao conectar a base de dados de usuário (T_T).`);
    console.error(error);
  });

try {
  app.listen(door, () => {
    console.log(
      `\nServidor de usuários rodando na porta ${door} (～￣▽￣)～!\n`
    );
  });
} catch (error) {
  console.log(`\nHouve um erro ao rodar o servidor de usuários na porta ${door} (T_T).\n`);
  console.error(error);
}

export default app;
