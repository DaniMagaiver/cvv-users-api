import { Users } from "../models";
import Services from "./Services";
import database from "../database";

export class UsersService extends Services<Users> {
  constructor() {
    super(database.getMongoRepository(Users));
  }
}
