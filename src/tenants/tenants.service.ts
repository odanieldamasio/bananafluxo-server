import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTenantDto } from './dto/create-tenant.dto';

@Injectable()
export class TenantsService {
  constructor(private prismaService: PrismaService) {}

  async create(createTenantDto: CreateTenantDto) {
    return this.prismaService.tenant.create({
      data: { ...createTenantDto },
    });
  }

  async findAll() {
    return this.prismaService.tenant.findMany();
  }

  async findOne(id: string) {
    return this.prismaService.tenant.findUnique({ where: { id } });
  }
}
