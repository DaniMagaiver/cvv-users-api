import "reflect-metadata";
import cors from "cors";
import express from "express";
import database from "./database";
import routes from "./routes";
import bodyParser from "body-parser";

const app = express();
const door = process.env.EXPRESS_DOOR;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

console.log(`\nConectando a base de dados ⚆_⚆...\n`);
database
  .initialize()
  .then(() => {
    database.runMigrations();
    console.log(`\nConectado com sucesso a base de dados ~(￣▽￣)~*!\n`);
  })
  .catch((error) => {
    console.log(`\nHouve um erro ao conectar a base de dados (T_T).`);
    console.error(error);
  });

try {
  app.listen(door, () => {
    console.log(
      `\nServidor de usuários rodando na porta ${door} (～￣▽￣)～!\n`
    );
  });
} catch (error) {
  console.log(`\nHouve um erro ao rodar o servidor na porta ${door} (T_T).\n`);
  console.error(error);
}

export default app;
