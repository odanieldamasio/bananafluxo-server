import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { Transaction } from '@prisma/client';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  async create(
    @Body() createTransactionDto: CreateTransactionDto,
    @CurrentUser() userId: string,
  ): Promise<Transaction> {
    return this.transactionsService.createTransactionWithInstallments(
      createTransactionDto,
      userId,
    );
  }

  @Get()
  @ApiOperation({ summary: 'Find transactions by user' })
  async findAll(@CurrentUser() userId: string): Promise<Transaction[]> {
    return this.transactionsService.findAllByUserId(userId);
  }
}
