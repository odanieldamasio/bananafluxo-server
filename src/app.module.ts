import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TransactionsModule } from './transactions/transactions.module';
import { InstallmentsModule } from './installments/installments.module';
import { StripeModule } from './stripe/stripe.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    PrismaModule,
    UsersModule,
    AuthModule,
    TransactionsModule,
    InstallmentsModule,
    StripeModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
})
export class AppModule {}
