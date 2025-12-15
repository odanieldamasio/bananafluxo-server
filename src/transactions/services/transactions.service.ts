import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, LessThanOrEqual, Repository } from 'typeorm';
import { Transaction, TransactionStatus, TransactionType } from '../entities/transaction.entity';
import { CreateTransactionDto } from '../dto/create-transaction.dto';
import { MonthlyPerformanceDto } from '../dto/monthly-performance.dto';
import { InstallmentsService } from './installments.service';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
    private readonly installmentsService: InstallmentsService,
  ) {}

  async create(
    createTransactionDto: CreateTransactionDto,
    userId: string,
  ): Promise<Transaction> {
    const transaction = await this.transactionRepository.save(
      this.transactionRepository.create({
        ...createTransactionDto,
        userId,
      }),
    );

    if (createTransactionDto.totalInstallments > 1) {
      await this.installmentsService.createInstallments(
        {
          amount: createTransactionDto.amount,
          dueDate: createTransactionDto.dueDate,
          transactionId: transaction.id,
        },
        userId,
        createTransactionDto.totalInstallments,
      );
    }

    return transaction;
  }

  findAll(): Promise<Transaction[] | null> {
    return this.transactionRepository.find();
  }

  async currentBalance(userId: string) {
    const today = new Date();

    const transactions = await this.transactionRepository.find({
      where: {
        user: {
          id: userId,
        },
        date: LessThanOrEqual(today),
      },
    });

    const total = transactions.reduce((sum, transaction) => {
      if (transaction.type === TransactionType.INCOME) {
        return sum + Number(transaction.amount);
      } else if (transaction.type === TransactionType.EXPENSE) {
        return sum - Number(transaction.amount);
      }
      return sum;
    }, 0);

    return total;
  }

  async monthlyPerformance(userId: string): Promise<MonthlyPerformanceDto[]> {
    const results: MonthlyPerformanceDto[] = [];
    const now = new Date();

    for (let i = 3; i >= 0; i--) {
      const monthStart = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthEnd = new Date(
        now.getFullYear(),
        now.getMonth() - i + 1,
        0,
        23,
        59,
        59,
        999,
      );
      console.log(userId);
      const transactions = await this.transactionRepository.find({
        where: {
          user: { id: userId },
          date: Between(monthStart, monthEnd),
        },
      });

      const income = transactions
        .filter((t) => t.type === TransactionType.INCOME)
        .reduce((sum, t) => sum + Number(t.amount), 0);

      const expense = transactions
        .filter((t) => t.type === TransactionType.EXPENSE)
        .reduce((sum, t) => sum + Number(t.amount), 0);

      const monthName = monthStart
        .toLocaleString('pt-BR', { month: 'long' })
        .replace(/^./, (c) => c.toUpperCase());

      results.push({
        month: monthName,
        income,
        expense,
      });
    }

    return results;
  }

  async projectedIncome(userId: string) {
    const transactions = await this.transactionRepository.find({
      where: {
        user: { id: userId },
        type: TransactionType.INCOME,
      },
    });

    const total = transactions.reduce((sum, transaction) => {
      return sum + Number(transaction.amount);
    }, 0);

    return total;
  }
}
