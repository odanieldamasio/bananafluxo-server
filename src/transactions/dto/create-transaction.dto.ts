import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  IsBoolean,
  IsDateString,
  IsNumber,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  TransactionType,
  PaymentMethod,
  TransactionStatus,
} from '../entities/transaction.entity';

export class CreateTransactionDto {
  @ApiProperty({
    description: 'Tipo da transação',
    enum: TransactionType,
    example: TransactionType.INCOME,
  })
  @IsEnum(TransactionType)
  type: TransactionType;

  @ApiProperty({
    description: 'ID da categoria associada à transação',
    example: '53fd27e7-8933-4e7d-93c0-fc2d4a1f3fe4',
  })
  @IsUUID()
  @IsNotEmpty()
  categoryId: string;

  @ApiPropertyOptional({
    description: 'Titulo da transação',
    example: 'Salário',
  })
  @IsString()
  title: string;

  @ApiPropertyOptional({
    description: 'Descrição da transação',
    example: 'Salário referente ao mês de setembro',
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Numero de parcelas, Valor da transação',
    example: 2,
  })
  @IsNumber()
  totalInstallments: number;

  @ApiProperty({
    description: 'Valor da transação (máx. 2 casas decimais)',
    example: 2500.5,
  })
  @IsNumber({ maxDecimalPlaces: 2 })
  amount: number;

  @ApiProperty({
    description: 'Data da transação no formato ISO 8601',
    example: '2025-10-20',
  })
  @IsDateString()
  date: string;

  @ApiProperty({
    description: 'Data de vencimento da transação no formato ISO 8601',
    example: '2025-10-20',
  })
  @IsDateString()
  dueDate: string;

  @ApiProperty({
    description: 'Método de pagamento utilizado',
    enum: PaymentMethod,
    example: PaymentMethod.PIX,
  })
  @IsEnum(PaymentMethod)
  paymentMethod: PaymentMethod;

  @ApiProperty({
    description: 'Método de pagamento utilizado',
    enum: TransactionStatus,
    example: TransactionStatus.PENDING,
  })
  @IsEnum(TransactionStatus)
  transactionStatus: TransactionStatus;
}
