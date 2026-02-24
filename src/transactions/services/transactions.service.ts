import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, LessThanOrEqual, Repository } from 'typeorm';
import {
  Transaction,
  TransactionStatus,
  TransactionType,
} from '../entities/transaction.entity';
import { CreateTransactionDto } from '../dto/create-transaction.dto';
import { MonthlyPerformanceDto } from '../dto/monthly-performance.dto';
import { getCurrentMonthRange } from './../../utils/date.util';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
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

    return transaction;
  }

  async findAll(
    userId: string,
    query: {
      title?: string;
      status?: string;
      categoryId?: string;
      page?: number;
      limit?: number;
    },
  ) {
    const page = query.page ? Number(query.page) : 1;
    const limit = query.limit ? Number(query.limit) : 10;
    const skip = (page - 1) * limit;

    const qb = this.transactionRepository
      .createQueryBuilder('transaction')
      .leftJoinAndSelect('transaction.category', 'category')
      .where('transaction.userId = :userId', { userId });

    if (query.title) {
      qb.andWhere('LOWER(transaction.title) LIKE LOWER(:title)', {
        title: `%${query.title}%`,
      });
    }

    if (query.status) {
      qb.andWhere('transaction.status = :status', {
        status: query.status,
      });
    }

    if (query.categoryId) {
      qb.andWhere('transaction.categoryId = :categoryId', {
        categoryId: query.categoryId,
      });
    }

    const [data, totalItems] = await qb
      .orderBy('transaction.createdAt', 'DESC')
      .skip(skip)
      .take(limit)
      .getManyAndCount();

    return {
      data,
      meta: {
        page,
        limit,
        totalItems,
        totalPages: Math.ceil(totalItems / limit),
      },
    };
  }

  async findById(id: string, userId: string): Promise<Transaction | null> {
    return this.transactionRepository.findOne({
      where: { id, user: { id: userId } },
      relations: ['category', 'installments'],
    });
  }

  async currentBalance(userId: string) {
    const { startOfMonth, endOfMonth } = getCurrentMonthRange();

    const transactions = await this.transactionRepository.find({
      where: {
        user: {
          id: userId,
        },
        date: Between(startOfMonth, endOfMonth),
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

    // 🔹 Base: mês anterior
    const baseDate = new Date();
    baseDate.setMonth(baseDate.getMonth() - 1);

    for (let i = 3; i >= 0; i--) {
      const year = baseDate.getFullYear();
      const month = baseDate.getMonth() - i;

      const monthStart = new Date(year, month, 1);
      const monthEnd = new Date(year, month + 1, 0, 23, 59, 59, 999);

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
    const { startOfMonth, endOfMonth } = getCurrentMonthRange();

    const transactions = await this.transactionRepository.find({
      where: {
        user: { id: userId },
        type: TransactionType.INCOME,
        date: Between(startOfMonth, endOfMonth),
      },
    });

    const total = transactions.reduce((sum, transaction) => {
      return sum + Number(transaction.amount);
    }, 0);

    return total;
  }

  async totalExpense(userId: string) {
    const { startOfMonth, endOfMonth } = getCurrentMonthRange();

    const transactions = await this.transactionRepository.find({
      where: {
        user: { id: userId },
        type: TransactionType.EXPENSE,
        date: Between(startOfMonth, endOfMonth),
      },
    });

    const total = transactions.reduce((sum, transaction) => {
      return sum + Number(transaction.amount);
    }, 0);

    return total;
  }

  async getLastTransactions(
    userId: string,
    limit: number,
  ): Promise<Transaction[]> {
    return this.transactionRepository.find({
      where: {
        user: { id: userId },
      },
      order: {
        createdAt: 'DESC',
      },
      take: limit,
    });
  }
}
