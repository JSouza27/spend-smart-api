import { TypeEnum } from '../enum/type.enum';

export class CreateTransactionDto {
  account_id: string;
  description: string;
  invoiceDueDate: Date;
  value: number;
  type: TypeEnum;
  itIsPaid?: boolean;
  isPlanning?: boolean;
}
