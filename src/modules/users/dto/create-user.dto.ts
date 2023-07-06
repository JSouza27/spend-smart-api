import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsOptional,
  IsDataURI,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  @IsString({ message: 'O nome deve ser um texto' })
  name: string;

  @IsNotEmpty({ message: 'O e-mail é obrigatório' })
  @IsEmail({}, { message: 'E-mail inválido' })
  email: string;

  @IsDataURI({ message: 'Link inválido' })
  @IsString({ message: 'O link da imagem deve ser um texto' })
  @IsOptional()
  imageUrl?: string | null;
}
