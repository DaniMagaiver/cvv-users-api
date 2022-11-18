import { isMongoId } from "class-validator";
import database from "../database";
import { MongoRepository } from "typeorm";
import { isUuid } from "uuidv4";
import { MongoFindManyOptions } from "typeorm/find-options/mongodb/MongoFindManyOptions";

export default abstract class Services<T> {
  private repository: MongoRepository<T>;

  constructor(repository: MongoRepository<T>) {
    this.repository = repository;
  }

  protected isValidId(id: string) {
    const isuuid = isMongoId(id);
    if (!isuuid) throw new Error("ID inválido");
  }

  create(data: any) {
    return this.repository.save(data);
  }

  listAll() {
    return this.repository.find();
  }

  listAllPaginated(skip?: number, take?: number) {
    return this.repository.findAndCount({ skip, take });
  }

  findOne(id: any) {
    this.isValidId(id);
    return this.repository.findOne(id);
  }

  remove(id: string) {
    this.isValidId(id);
    return this.repository.softDelete(id);
  }

  update(id: string, data: any) {
    this.isValidId(id);
    return this.repository.update(id, data);
  }

  query(query: MongoFindManyOptions<T>) {
    return this.repository.find(query);
  }
}
