import mongoose, { HydratedDocument } from 'mongoose';
import { Account } from '../entities/account.entity';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from '../../users/entities/user.entity';

export type AccountDocument = HydratedDocument<AccountSchema>;

@Schema({ collection: 'accounts', timestamps: true })
export class AccountSchema implements Account {
  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }])
  users: User[];
}

export const AccountSchemaFactory = SchemaFactory.createForClass(AccountSchema);
