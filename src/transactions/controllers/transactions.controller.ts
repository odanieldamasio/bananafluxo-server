import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
  Post,
  Query,
} from '@nestjs/common';
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
  findAll(@Headers('x-user-id') userId: string, @Query() query: any) {
    return this.transactionsService.findAll(userId, query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get transaction by ID' })
  findById(
    @Param('id') id: string,
    @Headers('x-user-id') userId: string,
  ): Promise<Transaction | null> {
    return this.transactionsService.findById(id, userId);
  }
}
