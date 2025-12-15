import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Installment } from '../entities/installment.entity';
import { CreateInstallmentDto } from '../dto/create-installment.dto';

@Injectable()
export class InstallmentsService {
  constructor(
    @InjectRepository(Installment)
    private readonly installmentRepository: Repository<Installment>,
  ) {}

  async createInstallments(
    createInstallDto: CreateInstallmentDto,
    userId: string,
    totalInstallments: number,
  ): Promise<Installment[]> {
    const installments: Installment[] = [];

    const total = Number(createInstallDto.amount);
    const base = Number((total / totalInstallments).toFixed(2));

    let accumulated = 0;

    for (let index = 1; index <= totalInstallments; index++) {
      let amount = base;

      if (index === totalInstallments) {
        amount = Number((total - accumulated).toFixed(2));
      }

      accumulated = Number((accumulated + amount).toFixed(2));

      const dueDate = new Date(createInstallDto.dueDate);
      dueDate.setMonth(dueDate.getMonth() + (index - 1));

      installments.push(
        this.installmentRepository.create({
          ...createInstallDto,
          userId,
          installmentNumber: index,
          amount,
          dueDate,
        }),
      );
    }

    return this.installmentRepository.save(installments);
  }
}
