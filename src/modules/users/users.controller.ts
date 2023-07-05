import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FindUserDto } from './dto/find-user.dto';
import { AdditionalUsersService } from '../additional-users/additional-users.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly additionalService: AdditionalUsersService,
  ) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const checkAdditionalUserExists = await this.additionalService.find({
      additional_user_email: createUserDto.email,
    });

    return checkAdditionalUserExists.length
      ? this.usersService.createAdditionalUser(
          createUserDto,
          checkAdditionalUserExists[0].owner_user_email,
        )
      : this.usersService.create(createUserDto);
  }

  @Get()
  async findAll() {
    return this.usersService.findAll();
  }

  @Get('find-id')
  async findOne(@Query('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Get('find-email')
  async findByEmail(@Query() query: FindUserDto) {
    return this.usersService.find(query);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete('remove')
  async remove(@Query('id') id: string) {
    return this.usersService.remove(id);
  }
}
