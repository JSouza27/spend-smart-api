import { ArrayNotEmpty, IsArray, IsMongoId } from 'class-validator';
import { Types } from 'mongoose';

export class CreateAccountDto {
  @IsArray({ message: 'Users deve ser um array' })
  @ArrayNotEmpty({ message: 'Users não deve ser vazio ou nulo' })
  @IsMongoId({ message: 'Users deve ser uma lista de id ' })
  users: Array<Types.ObjectId>;
}
