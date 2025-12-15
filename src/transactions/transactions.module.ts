import { Module } from '@nestjs/common';
import { TransactionsController } from './controllers/transactions.controller';
import { TransactionsService } from './services/transactions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from './entities/transaction.entity';
import { CategoriesController } from './controllers/categories.controller';
import { CategoriesService } from './services/categories.service';
import { Category } from './entities/category.entity';
import { Installment } from './entities/installment.entity';
import { InstallmentsService } from './services/installments.service';

@Module({
  imports: [TypeOrmModule.forFeature([Transaction, Category, Installment])],
  controllers: [TransactionsController, CategoriesController],
  providers: [TransactionsService, CategoriesService, InstallmentsService],
  exports: [TransactionsService, CategoriesService, InstallmentsService],
})
export class TransactionsModule {}
