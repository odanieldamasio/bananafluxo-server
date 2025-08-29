import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { PrismaErrors } from 'src/prisma/prisma-errors.enum';

@Injectable()
export class TenantsService {
  constructor(private prismaService: PrismaService) {}

  async create(createTenantDto: CreateTenantDto) {
    try {
      return await this.prismaService.tenant.create({
        data: { ...createTenantDto },
      });
    } catch (error: any) {
      if (error?.code === PrismaErrors.UniqueConstraint) {
        throw new BadRequestException(
          `O slug '${createTenantDto.slug}' já existe`,
        );
      }

      throw error;
    }
  }

  async findAll() {
    return this.prismaService.tenant.findMany();
  }

  async findOne(id: string) {
    return this.prismaService.tenant.findUnique({ where: { id } });
  }
}
