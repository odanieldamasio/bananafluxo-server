import { Injectable } from '@nestjs/common';
import { TransactionsService } from 'src/transactions/services/transactions.service';

@Injectable()
export class DashboardService {
  constructor(private readonly transactionsService: TransactionsService) {}

  async getKpi(userId: string) {
    const currentBalance =
      await this.transactionsService.currentBalance(userId);
    const projectedIncome =
      await this.transactionsService.projectedIncome(userId);
    const totalExpense = 2970.25;
    const totalTransactions = 34;
    const monthlyPerformance =
      await this.transactionsService.monthlyPerformance(userId);

    return {
      currentBalance,
      projectedIncome,
      totalExpense,
      totalTransactions,
      monthlyPerformance,
    };
  }
}
