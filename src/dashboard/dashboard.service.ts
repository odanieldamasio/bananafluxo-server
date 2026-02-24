import { Injectable } from '@nestjs/common';
import { TransactionsService } from './../transactions/services/transactions.service';

@Injectable()
export class DashboardService {
  constructor(private readonly transactionsService: TransactionsService) {}

  async getKpi(userId: string) {
    const currentBalance =
      await this.transactionsService.currentBalance(userId);
    const projectedIncome =
      await this.transactionsService.projectedIncome(userId);
    const totalExpense = await this.transactionsService.totalExpense(userId);
    const totalTransactions = 34;
    const monthlyPerformance =
      await this.transactionsService.monthlyPerformance(userId);

    const lastTransactions = await this.transactionsService.getLastTransactions(
      userId,
      5,
    );

    return {
      currentBalance,
      projectedIncome,
      totalExpense,
      totalTransactions,
      monthlyPerformance,
      lastTransactions,
    };
  }
}
