import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from '../entities/user.entity';
import { Account } from '../../accounts/entities/account.entity';

export type UserDocument = HydratedDocument<UserSchema>;

@Schema({ collection: 'users', timestamps: true })
export class UserSchema implements User {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'accounts' })
  account: Account;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop()
  imageUrl: string;

  @Prop()
  additional_user_id: string;
}

export const UserSchemaFactory = SchemaFactory.createForClass(UserSchema);
