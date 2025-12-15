import { Body, Controller, Get, Headers, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { TransactionsService } from '../services/transactions.service';
import { Transaction } from '../entities/transaction.entity';
import { CreateTransactionDto } from '../dto/create-transaction.dto';

@ApiBearerAuth()
@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new transaction' })
  create(
    @Body() createTransactionDto: CreateTransactionDto,
    @Headers('x-user-id') userId: string,
  ): Promise<Transaction> {
    return this.transactionsService.create(createTransactionDto, userId);
  }

  @Get()
  @ApiOperation({ summary: 'Get all transactions' })
  findAll(): Promise<Transaction[] | null> {
    return this.transactionsService.findAll();
  }
}
