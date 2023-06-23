import { Prop, Schema } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Account' })
  account: string;

  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  imageUrl: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  additional_user: User;
}
