import { Users } from "./../models/Users";
import { UsersService } from "../services/Users.service";
import { Request, Response } from "express";
import { isMongoId, validate, ValidationError } from "class-validator";
import { isUuid } from "uuidv4";

export class UsersController {
  private static async verify(errors: Promise<ValidationError[]>) {
    const errorList = await errors;
    if (errorList.length) {
      const [error] = errorList.map(
        ({ constraints }) => Object.values(constraints)[0]
      );
      throw new Error(error);
    }
  }

  static async getAll(request: Request, response: Response): Promise<Response> {
    try {
      const usersService = new UsersService();
      const { index, limit } = request.query;
      let users = null;
      if (index !== null) {
        const [content, size] = await usersService.listAllPaginated(
          Number(index),
          Number(limit)
        );
        users = { content, size, index: Number(index) };
      } else {
        users = await usersService.listAll();
      }
      return response.status(200).json(users);
    } catch (error) {
      return response.status(500).json(error);
    }
  }

  static async create(request: Request, response: Response): Promise<Response> {
    try {
      const userService = new UsersService();
      const user: Users = new Users(request?.body);
      await this.verify(
        validate(user, {
          enableDebugMessages: true,
          stopAtFirstError: true,
        })
      );
      const newUser = await userService.create(user);
      return response.status(200).json(newUser);
    } catch ({ message }) {
      return response.status(400).json({ message });
    }
  }

  static async update(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const userService = new UsersService();
      const user: Users = await userService.findOne(id);

      if (!user) {
        throw new Error("Usuário não encontrado.");
      }

      Object.assign(user, { ...request.body, status: user.status });

      await this.verify(
        validate(user, {
          enableDebugMessages: true,
          stopAtFirstError: true,
        })
      );

      await userService.update(id, user);

      return response
        .status(200)
        .json({ message: "Usuário alterado com sucesso!" });
    } catch ({ message }) {
      return response.status(400).json({ message });
    }
  }

  static async updateStatus(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const { status } = request.query;

      const userService = new UsersService();
      const user: Users = await userService.findOne(id);
      user.status = status as "inactive" | "active";

      if (!user) {
        throw new Error("Usuário não encontrado.");
      }

      await this.verify(
        validate(user, {
          enableDebugMessages: true,
          stopAtFirstError: true,
        })
      );

      await userService.update(id, user);

      return response
        .status(200)
        .json({ message: "Status de usuário alterado com sucesso!" });
    } catch ({ message }) {
      return response.status(400).json({ message });
    }
  }

  static async updateType(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const { type } = request.query;
      const userService = new UsersService();
      const user: Users = await userService.findOne(id);
      user.type = type as "volunteer" | "admin";
      if (!user) {
        throw new Error("Usuário não encontrado.");
      }

      await this.verify(
        validate(user, {
          enableDebugMessages: true,
          stopAtFirstError: true,
        })
      );

      await userService.update(id, user);

      return response
        .status(200)
        .json({ message: "Tipo de usuário alterado com sucesso!" });
    } catch ({ message }) {
      return response.status(400).json({ message });
    }
  }
}
