// create-transaction.dto.ts
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsNumber, IsString, Min } from 'class-validator';
import { TransactionType } from '@prisma/client';

export class CreateTransactionDto {
  @ApiProperty({ enum: TransactionType, description: 'Tipo da transação' })
  @IsEnum(TransactionType)
  type: TransactionType;

  @ApiPropertyOptional({ description: 'Descrição da transação' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ description: 'Valor total da transação', example: 150.5 })
  @IsNumber()
  @Min(0)
  totalAmount: number;

  @ApiPropertyOptional({ description: 'Número de parcelas', example: 1 })
  @IsNumber()
  @Min(1)
  @IsOptional()
  installments?: number;
}
