import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateInstallmentDto } from './dto/create-installment.dto';
import { Installment } from '@prisma/client';

@Injectable()
export class InstallmentsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    createInstallmentDto: CreateInstallmentDto,
    transactionId: string,
  ): Promise<Installment> {
    return await this.prismaService.installment.create({
      data: {
        ...createInstallmentDto,
        transaction: { connect: { id: transactionId } },
      },
    });
  }
}
