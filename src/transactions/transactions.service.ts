import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { Transaction, Installment } from '@prisma/client';

@Injectable()
export class TransactionsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    createTransactionDto: CreateTransactionDto,
    userId: string,
  ): Promise<Transaction> {
    return await this.prismaService.transaction.create({
      data: {
        ...createTransactionDto,
        user: { connect: { id: userId } },
      },
      include: { installmentsList: true }, // opcional
    });
  }

  async createTransactionWithInstallments(
    createTransactionDto: CreateTransactionDto,
    userId: string,
  ): Promise<Transaction> {
    // 1️⃣ Cria a transaction
    const transaction = await this.prismaService.transaction.create({
      data: {
        ...createTransactionDto,
        user: { connect: { id: userId } },
      },
    });

    // 2️⃣ Calcula parcelas
    const totalInstallments = createTransactionDto.installments || 1;
    const installmentAmount =
      Number(createTransactionDto.totalAmount) / totalInstallments;

    // 3️⃣ Cria as installments
    const installmentsPromises: Promise<Installment>[] = [];

    for (let i = 0; i < totalInstallments; i++) {
      const dueDate = new Date();
      dueDate.setMonth(dueDate.getMonth() + i);

      installmentsPromises.push(
        this.prismaService.installment.create({
          data: {
            transactionId: transaction.id,
            installmentNumber: i + 1,
            amount: installmentAmount,
            dueDate,
          },
        }),
      );
    }

    await Promise.all(installmentsPromises);

    // 4️⃣ Retorna a transaction com installments
    return this.prismaService.transaction.findUniqueOrThrow({
      where: { id: transaction.id },
      include: { installmentsList: true },
    });
  }

  async findUniqueOrThrow(id: string): Promise<Transaction> {
    try {
      return await this.prismaService.transaction.findUniqueOrThrow({
        where: { id },
        include: { installmentsList: true },
      });
    } catch (error) {
      throw new NotFoundException(`Transaction with id ${id} not found`);
    }
  }

  async findUniqueByIdOrThrow(
    id: string,
    userId: string,
  ): Promise<Transaction> {
    try {
      return await this.prismaService.transaction.findUniqueOrThrow({
        where: { id, userId },
        include: { installmentsList: true },
      });
    } catch (error) {
      throw new NotFoundException(`Transaction with id ${id} not found`);
    }
  }

  async findAllByUserId(userId: string): Promise<Transaction[]> {
    return await this.prismaService.transaction.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      include: { installmentsList: true },
    });
  }
}
