import { Module } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { AccountsController } from './accounts.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountSchema, AccountSchemaFactory } from './schemas/account.shema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AccountSchema.name, schema: AccountSchemaFactory },
    ]),
  ],
  controllers: [AccountsController],
  providers: [AccountsService],
  exports: [AccountsService],
})
export class AccountsModule {}
