import { Account } from '../../accounts/entities/account.entity';

export class User {
  account: Account;
  name: string;
  email: string;
  imageUrl: string;
  additional_user_id: string;
}
