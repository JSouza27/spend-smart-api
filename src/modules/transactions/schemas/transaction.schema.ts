import mongoose, { HydratedDocument, Types } from 'mongoose';
import { Transaction } from '../entities/transaction.entity';
import { TypeEnum } from '../enum/type.enum';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type TransactionDocument = HydratedDocument<TransactionSchema>;

@Schema({ collection: 'transactions' })
export class TransactionSchema implements Transaction {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'accounts' })
  account_id: Types.ObjectId;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  invoiceDueDate: Date;

  @Prop({ required: true })
  value: number;

  @Prop({ required: true })
  type: TypeEnum;

  @Prop()
  itIsPaid?: boolean;

  @Prop()
  isPlanning?: boolean;
}

export const TransactionSchemaFactory =
  SchemaFactory.createForClass(TransactionSchema);
