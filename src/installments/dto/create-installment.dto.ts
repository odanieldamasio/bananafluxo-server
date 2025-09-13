import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, Min, IsDate, IsEnum, IsOptional } from 'class-validator';
import { InstallmentStatus } from '@prisma/client';

export class CreateInstallmentDto {
  @ApiProperty({ description: 'Número da parcela', example: 1 })
  @IsNumber()
  @Min(1)
  installmentNumber: number;

  @ApiProperty({ description: 'Valor da parcela', example: 50.25 })
  @IsNumber()
  @Min(0)
  amount: number;

  @ApiProperty({
    description: 'Data de vencimento da parcela',
    example: '2025-09-15T00:00:00.000Z',
  })
  @IsDate()
  dueDate: Date;

  @ApiProperty({
    enum: InstallmentStatus,
    description: 'Status da parcela',
    default: 'PENDING',
  })
  @IsEnum(InstallmentStatus)
  @IsOptional()
  status?: InstallmentStatus;

  @ApiProperty({
    description: 'Data de pagamento',
    example: '2025-09-16T00:00:00.000Z',
    required: false,
  })
  @IsOptional()
  @IsDate()
  paidAt?: Date;
}
