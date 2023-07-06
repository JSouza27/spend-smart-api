import { PartialType } from '@nestjs/mapped-types';
import { CreateTransactionDto } from './create-transaction.dto';

export class FindTransactionDto extends PartialType(CreateTransactionDto) {}
