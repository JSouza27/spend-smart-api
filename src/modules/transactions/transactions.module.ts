import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  TransactionSchema,
  TransactionSchemaFactory,
} from './schemas/transaction.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TransactionSchema.name, schema: TransactionSchemaFactory },
    ]),
  ],
  controllers: [TransactionsController],
  providers: [TransactionsService],
})
export class TransactionsModule {}
