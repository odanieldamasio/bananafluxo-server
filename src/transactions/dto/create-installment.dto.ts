import { IsDateString, IsNotEmpty, IsNumber, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateInstallmentDto {
  @ApiProperty({
    description: 'ID da transação associada à parcela',
    example: '53fd27e7-8933-4e7d-93c0-fc2d4a1f3fe4',
  })
  @IsUUID()
  @IsNotEmpty()
  transactionId: string;

  @ApiProperty({
    description: 'Valor da parcela (máx. 2 casas decimais)',
    example: 2500.5,
  })
  @IsNumber({ maxDecimalPlaces: 2 })
  amount: number;

  @ApiProperty({
    description: 'Data de vencimento da parcela no formato ISO 8601',
    example: '2025-10-20',
  })
  @IsDateString()
  dueDate: string;
}
