import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { InjectModel } from '@nestjs/mongoose';
import { TransactionSchema } from './schemas/transaction.schema';
import { Model } from 'mongoose';
import { FindTransactionDto } from './dto/find-transaction.dto';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectModel(TransactionSchema.name)
    private readonly transactionModel: Model<TransactionSchema>,
  ) {}

  async create(createTransactionDto: CreateTransactionDto) {
    return this.transactionModel.create(createTransactionDto);
  }

  async find(account_id: string, data: FindTransactionDto) {
    return this.transactionModel.find({ $and: [{ account_id }, data] }).exec();
  }

  async update(id: string, updateTransactionDto: UpdateTransactionDto) {
    const response = await this.transactionModel
      .findByIdAndUpdate({ _id: id }, updateTransactionDto)
      .exec();

    if (!response) {
      throw new BadRequestException('Ocorreu um erro ao atualizar transação');
    }

    return {
      message: 'Transação atualizada com sucesso',
      removed: true,
    };
  }

  async remove(id: string) {
    const response = await this.transactionModel
      .findOneAndDelete({ _id: id })
      .exec();

    if (!response) {
      throw new BadRequestException('Ocorreu um erro ao remover a transação');
    }

    return {
      message: 'Usuário removido com sucesso',
      removed: true,
    };
  }
}
