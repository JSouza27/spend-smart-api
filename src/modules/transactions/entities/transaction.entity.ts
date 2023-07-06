import { Types } from 'mongoose';
import { TypeEnum } from '../enum/type.enum';

export class Transaction {
  account_id: Types.ObjectId;
  description: string;
  invoiceDueDate: Date;
  value: number;
  type: TypeEnum;
  itIsPaid?: boolean;
  isPlanning?: boolean;
}
