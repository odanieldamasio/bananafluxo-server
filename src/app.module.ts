import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TransactionsModule } from './transactions/transactions.module';
import { InstallmentsModule } from './installments/installments.module';

@Module({
  imports: [PrismaModule, UsersModule, AuthModule, TransactionsModule, InstallmentsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
