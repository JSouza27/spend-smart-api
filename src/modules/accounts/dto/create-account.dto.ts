import { UserSchema } from '../../users/schemas/user.schema';

export class CreateAccountDto {
  id: string;
  users: UserSchema[];
}
