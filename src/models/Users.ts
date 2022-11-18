import { Column, Entity, ObjectIdColumn, PrimaryColumn } from "typeorm";
import {
  IsBoolean,
  IsDateString,
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsPhoneNumber,
  MaxLength,
} from "class-validator";
import { ObjectID } from "bson";

@Entity()
export class Users {
  @ObjectIdColumn({ name: "_id" })
  _id: ObjectID;

  @Column()
  @IsNotEmpty({ message: "Nome é um campo obrigatório." })
  name: string;

  @Column()
  @IsNotEmpty({ message: "Data é um campo obrigatório." })
  birthDay: string;

  @Column()
  @IsEmail({ message: "Email inválido." })
  @IsNotEmpty({ message: "Email é um campo obrigatório." })
  email: string;

  @Column()
  @MaxLength(2, { message: "O campo deve ter no máximo 2 caracteres." })
  @IsNotEmpty({ message: "UF é um campo obrigatório." })
  uf: string;

  @Column()
  @IsNotEmpty({ message: "Cidade é um campo obrigatório" })
  city: string;

  @Column()
  @IsPhoneNumber("BR", {
    message: "Utilize um telefone válido no formato (xx)9xxxx-xxxx",
  })
  @IsNotEmpty({ message: "Telefone é um campo obrigatório" })
  telephone: string;

  @Column()
  @IsIn(["active", "inactive"], {
    message: "O status deve ser 'inactive' ou 'active'",
  })
  @IsNotEmpty({ message: "Status é um campo obrigatório" })
  status: "active" | "inactive";

  @Column()
  @IsIn(["volunteer", "admin"], {
    message: "O usuário deve ser do tipo 'volunteer' ou 'admin'",
  })
  @IsNotEmpty({ message: "Tipo é um campo obrigatório" })
  type: "volunteer" | "admin";

  @Column()
  @IsBoolean({ message: "O campo é do tipo boolean" })
  isApproved: boolean;

  constructor(data: any) {
    Object.assign(this, data);
  }
}
