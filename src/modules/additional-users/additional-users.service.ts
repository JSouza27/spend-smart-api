import {
  BadRequestException,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { CreateAdditionalUserDto } from './dto/create-additional-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { AdditionalUserSchema } from './schemas/additional-user.schema';
import { Model } from 'mongoose';
import { UsersService } from '../users/users.service';
import { FindAdditionalUserDto } from './dto/find-addtional-user.dto';

@Injectable()
export class AdditionalUsersService {
  constructor(
    @InjectModel(AdditionalUserSchema.name)
    private readonly additionalUserModel: Model<AdditionalUserSchema>,
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
  ) {}

  async create(createAdditionalUserDto: CreateAdditionalUserDto) {
    const { additional_user_email, owner_user_email } = createAdditionalUserDto;

    const checkUserExists = await this.usersService.find({
      email: additional_user_email,
    });

    if (checkUserExists.length) {
      throw new BadRequestException('Usuário já possuí outro cadastro');
    }

    const checkAdditionalUserExists = await this.additionalUserModel.find({
      additional_user_email,
    });

    if (checkAdditionalUserExists.length) {
      throw new BadRequestException('Usuário está vinculado a uma conta');
    }

    const checkOwnerUserExists = await this.additionalUserModel.find({
      owner_user_email,
    });

    if (checkOwnerUserExists.length) {
      throw new BadRequestException('Usuário possuí outro usuário vinculado');
    }

    const additionalUser = await this.additionalUserModel.create(
      createAdditionalUserDto,
    );
    return additionalUser;
  }

  async find(query: FindAdditionalUserDto) {
    return this.additionalUserModel.find(query);
  }

  async findByEmail(email: string) {
    return this.additionalUserModel.find({
      $or: [{ additional_user_email: email }, { owner_user_email: email }],
    });
  }

  async remove(id: string) {
    const additionalUser = await this.additionalUserModel.findById(id);

    if (!additionalUser) {
      throw new BadRequestException('Não existe vinculo parra esse usuário');
    }

    const response = await this.additionalUserModel.deleteOne({
      _id: additionalUser[0]._id,
    });

    if (response.deletedCount !== 1) {
      throw new BadRequestException('Ocorreu um erro ao remover vinculo');
    }

    return {
      message: 'Vinculo removido com sucesso',
      removed: true,
    };
  }
}
