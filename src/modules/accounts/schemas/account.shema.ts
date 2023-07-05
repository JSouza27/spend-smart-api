import mongoose, { HydratedDocument, Types } from 'mongoose';
import { Account } from '../entities/account.entity';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type AccountDocument = HydratedDocument<AccountSchema>;

@Schema({ collection: 'accounts', timestamps: true })
export class AccountSchema implements Account {
  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }])
  users: Types.ObjectId[];
}

export const AccountSchemaFactory = SchemaFactory.createForClass(AccountSchema);
