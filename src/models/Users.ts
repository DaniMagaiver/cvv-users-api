import { Column, Entity, ObjectIdColumn } from "typeorm";
import {
  IsDateString,
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsPhoneNumber,
  MaxLength,
} from "class-validator";

@Entity()
export class Users {
  @ObjectIdColumn({ name: "_id" })
  id: string;

  @Column()
  @IsNotEmpty({ message: "Nome é um campo obrigatório." })
  name: string;

  @Column()
  @IsDateString({}, { message: "A data deve ser no formato YYYY-MM-DD" })
  @IsNotEmpty({ message: "Nome é um campo obrigatório." })
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

  constructor(data: any) {
    Object.assign(this, data);
  }
}
