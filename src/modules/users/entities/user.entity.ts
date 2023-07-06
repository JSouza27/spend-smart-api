import { Types } from 'mongoose';

export class User {
  account: Types.ObjectId;
  name: string;
  email: string;
  imageUrl?: string | null;
  additional_user_id?: Types.ObjectId | null;
}
