import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { AccountSchema } from './schemas/account.shema';
import { Model } from 'mongoose';
import { Account } from './entities/account.entity';

@Injectable()
export class AccountsService {
  constructor(
    @InjectModel(AccountSchema.name)
    private accountModel: Model<AccountSchema>,
  ) {}

  async create(createAccountDto: CreateAccountDto) {
    const account = await this.accountModel.create(createAccountDto);
    return account;
  }

  async findAll(): Promise<Account[]> {
    return this.accountModel.find();
  }

  async findOne(id: string) {
    const account = await this.accountModel.findById(id);

    if (!account) {
      throw new BadRequestException('Conta não existe');
    }

    return account;
  }

  async update(id: string, updateAccountDto: UpdateAccountDto) {
    await this.findOne(id);

    const accountUpdated = await this.accountModel.updateOne(
      { _id: id },
      updateAccountDto,
    );

    if (accountUpdated.matchedCount !== 1) {
      throw new BadRequestException(
        'Ocorreu um erro ao atualizar os dados da conta',
      );
    }

    return this.findOne(id);
  }

  async remove(
    account_id: string,
    user_id: string,
  ): Promise<{
    message: string;
    removed: boolean;
  }> {
    const account = await this.findOne(account_id);

    if (account.users.length > 1) {
      const userAccounts = account.users.filter(
        (user) => user._id.toString() === user_id,
      );

      await this.update(account_id, { users: userAccounts });

      return {
        message: 'Usuário removido da conta com sucesso',
        removed: true,
      };
    } else {
      const response = await this.accountModel.deleteOne({ _id: account_id });

      if (response.deletedCount !== 1) {
        throw new BadRequestException('Ocorreu um erro ao remover a conta');
      }

      return {
        message: 'Conta removida com sucesso',
        removed: true,
      };
    }
  }
}
