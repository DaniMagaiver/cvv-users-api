import { Users } from "../models";
import Services from "./Services";
import database from "../database";

export class UsersService extends Services<Users> {
  constructor() {
    super(database.getMongoRepository(Users));
  }

  findApprovalList() {
    return this.query({ where: { isApproved: false } });
  }

  listAllUsersPaginated(skip?: number, take?: number) {
    return this.query({ skip, take, where: { isApproved: true } });
  }

  listAllUsers() {
    return this.query({ where: { isApproved: true } });
  }
}
