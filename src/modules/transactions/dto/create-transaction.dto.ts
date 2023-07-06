import {
  IsBoolean,
  IsDate,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsTimeZone,
  Min,
  MinLength,
} from 'class-validator';
import { TypeEnum } from '../enum/type.enum';

export class CreateTransactionDto {
  @IsMongoId()
  account_id: string;

  @IsString({ message: 'A descrição deve ser uma string' })
  @MinLength(3, { message: 'A descrição tem que ter mais de 3 caracteries' })
  @IsNotEmpty({ message: 'A descrição não pode ser vazia ou nula' })
  description: string;

  @IsDate({ message: 'Data inválida' })
  @IsTimeZone({ message: 'Timezone inválido' })
  invoiceDueDate: Date;

  @IsNumber({}, { message: 'O valor deve ser um número válido' })
  @IsNotEmpty({ message: 'O valor não pode ser vazio ou nulo' })
  @Min(0, { message: 'O valor deve ser maio que zero' })
  value: number;

  @IsEnum(TypeEnum, { message: 'Tipo inválido' })
  type: TypeEnum;

  @IsBoolean({ message: 'Esse campo deve ter um valor boleano' })
  @IsOptional()
  itIsPaid?: boolean;

  @IsBoolean({ message: 'Esse campo deve ter um valor boleano' })
  @IsOptional()
  isPlanning?: boolean;
}
