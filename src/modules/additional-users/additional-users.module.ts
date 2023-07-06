import { Module, forwardRef } from '@nestjs/common';
import { AdditionalUsersService } from './additional-users.service';
import { AdditionalUsersController } from './additional-users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  AdditionalUserSchema,
  AdditionalUserSchemaFactory,
} from './schemas/additional-user.schema';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AdditionalUserSchema.name, schema: AdditionalUserSchemaFactory },
    ]),
    forwardRef(() => UsersModule),
  ],
  controllers: [AdditionalUsersController],
  providers: [AdditionalUsersService],
  exports: [AdditionalUsersService],
})
export class AdditionalUsersModule {}
