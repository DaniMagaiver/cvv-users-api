import { DataSource } from "typeorm";

export default new DataSource({
  type: "mongodb",
  url: process.env.TYPEORM_HOST,
  database: process.env.TYPEORM_DATABASE,
  migrations: ["./migrations/*.{js,ts}"],
  entities: ["src/models/*.{js,ts}"],
  logging: "all",
});
