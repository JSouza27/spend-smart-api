import {
  BadRequestException,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { UserSchema } from './schemas/user.schema';
import { Model } from 'mongoose';
import { AccountsService } from '../accounts/accounts.service';
import { FindUserDto } from './dto/find-user.dto';
import { AdditionalUsersService } from '../additional-users/additional-users.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(UserSchema.name)
    private readonly userModel: Model<UserSchema>,
    @Inject(forwardRef(() => AccountsService))
    private readonly accountsService: AccountsService,
    @Inject(forwardRef(() => AdditionalUsersService))
    private readonly additionalUsersService: AdditionalUsersService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const checkEmailExist = await this.userModel.findOne({
      email: createUserDto.email,
    });

    if (checkEmailExist) {
      throw new BadRequestException('Usuário já existe');
    }

    const user = await this.userModel.create(createUserDto);
    const account = await this.accountsService.create({ users: [user._id] });

    user.account = account.id;
    user.save();

    return user;
  }

  async createAdditionalUser(createUserDto: CreateUserDto, ownerEmail: string) {
    const checkEmailExist = await this.userModel.findOne({
      email: createUserDto.email,
    });

    if (checkEmailExist) {
      throw new BadRequestException('Usuário já existe');
    }

    const ownerUser = await this.find({ email: ownerEmail });
    const account = await this.accountsService.findOne(
      ownerUser[0].account._id.toString(),
    );
    const user = await this.userModel.create({
      ...createUserDto,
      account: account._id,
      additional_user_id: ownerUser[0]._id,
    });

    await this.accountsService.update(account._id.toString(), {
      users: [...account.users, user._id],
    });
    await this.userModel.updateOne(
      { _id: ownerUser[0]._id },
      { additional_user_id: user._id },
    );

    return user;
  }

  async findAll() {
    return this.userModel.find();
  }

  async findOne(id: string) {
    const user = await this.userModel.findById(id);

    if (!user) {
      throw new BadRequestException('Usuário não existe');
    }

    return user;
  }

  async find(query: FindUserDto) {
    return this.userModel.find(query);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userModel.findById(id);

    if (!user) {
      throw new BadRequestException('Usuário não existe');
    }

    const userUpdated = await this.userModel.updateOne(
      { _id: id },
      updateUserDto,
    );

    if (userUpdated.matchedCount !== 1) {
      throw new BadRequestException(
        'Ocorreu um erro ao atualizar os dados do usuário',
      );
    }

    return this.userModel.findById(id);
  }

  async remove(id: string) {
    const user = await this.findOne(id);
    const checkAdditionalUserExists =
      await this.additionalUsersService.findByEmail(user.email);

    if (checkAdditionalUserExists.length) {
      throw new BadRequestException(
        'Este usuário está vinculado a uma conta compartilhada com outro usuário',
      );
    }

    if (user.additional_user_id) {
      await this.update(user.additional_user_id.toString(), {
        additional_user_id: null,
      });
    }

    await this.accountsService.remove(
      user.account._id.toString(),
      user._id.toString(),
    );

    const response = await this.userModel.deleteOne({ _id: id });

    if (response.deletedCount !== 1) {
      throw new BadRequestException('Ocorreu um erro ao remover a conta');
    }

    return {
      message: 'Usuário removido com sucesso',
      removed: true,
    };
  }
}
