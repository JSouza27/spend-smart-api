import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { AdditionalUsersService } from './additional-users.service';
import { CreateAdditionalUserDto } from './dto/create-additional-user.dto';
import { FindAdditionalUserDto } from './dto/find-addtional-user.dto';

@Controller('additional-users')
export class AdditionalUsersController {
  constructor(
    private readonly additionalUsersService: AdditionalUsersService,
  ) {}

  @Post()
  async create(@Body() createAdditionalUserDto: CreateAdditionalUserDto) {
    return this.additionalUsersService.create(createAdditionalUserDto);
  }

  @Get('find')
  async find(@Query() query: FindAdditionalUserDto) {
    return this.additionalUsersService.find(query);
  }

  @Get('find-by-email')
  async findByEmail(@Query() query: { email: string }) {
    return this.additionalUsersService.findByEmail(query.email);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.additionalUsersService.remove(id);
  }
}
