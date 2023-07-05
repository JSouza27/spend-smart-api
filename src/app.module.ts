import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { UsersModule } from './modules/users/users.module';
import { AccountsModule } from './modules/accounts/accounts.module';
import { AdditionalUsersModule } from './modules/additional-users/additional-users.module';
import { TransactionsModule } from './modules/transactions/transactions.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.HOST),
    UsersModule,
    AccountsModule,
    AdditionalUsersModule,
    TransactionsModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
