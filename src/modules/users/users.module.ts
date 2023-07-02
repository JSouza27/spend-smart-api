import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema, UserSchemaFactory } from './schemas/user.schema';
import {
  AccountSchema,
  AccountSchemaFactory,
} from '../accounts/schemas/account.shema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserSchema.name, schema: UserSchemaFactory },
      { name: AccountSchema.name, schema: AccountSchemaFactory },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [
    MongooseModule.forFeature([
      { name: UserSchema.name, schema: UserSchemaFactory },
    ]),
  ],
})
export class UsersModule {}
