import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AdditionalUser } from '../entities/additional-user.entity';
import { HydratedDocument } from 'mongoose';

export type AdditionalUserDocument = HydratedDocument<AdditionalUserSchema>;

@Schema({ collection: 'additional_users', timestamps: true })
export class AdditionalUserSchema implements AdditionalUser {
  @Prop({ required: true })
  owner_user_email: string;

  @Prop({ required: true })
  additional_user_email: string;
}

export const AdditionalUserSchemaFactory =
  SchemaFactory.createForClass(AdditionalUserSchema);
