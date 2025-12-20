import { forwardRef, Module } from '@nestjs/common';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { TransactionsService } from 'src/transactions/services/transactions.service';
import { Transaction } from 'src/transactions/entities/transaction.entity';
import { TransactionsModule } from 'src/transactions/transactions.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Transaction]),
    forwardRef(() => TransactionsModule),
  ],
  controllers: [DashboardController],
  providers: [DashboardService, TransactionsService],
})
export class DashboardModule {}
