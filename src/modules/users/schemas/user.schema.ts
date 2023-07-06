import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';
import { User } from '../entities/user.entity';

export type UserDocument = HydratedDocument<UserSchema>;

@Schema({ collection: 'users', timestamps: true })
export class UserSchema implements User {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'accounts' })
  account: Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop()
  imageUrl?: string | null;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'users' })
  additional_user_id?: Types.ObjectId | null;
}

export const UserSchemaFactory = SchemaFactory.createForClass(UserSchema);
