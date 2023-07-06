import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateAdditionalUserDto {
  @IsEmail({}, { message: 'E-mail inválido' })
  @IsNotEmpty({ message: 'O owner_user_email é obrigatório' })
  owner_user_email: string;

  @IsEmail({}, { message: 'E-mail inválido' })
  @IsNotEmpty({ message: 'O additional_user_email é obrigatório' })
  additional_user_email: string;
}
