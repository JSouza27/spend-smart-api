import { IsEmail, IsString, IsOptional } from 'class-validator';

export class FindUserDto {
  @IsOptional()
  @IsString({ message: 'O nome deve ser um texto' })
  name?: string;

  @IsOptional()
  @IsEmail({}, { message: 'E-mail inválido' })
  email?: string;
}
