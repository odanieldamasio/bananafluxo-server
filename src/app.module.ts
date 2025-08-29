import { Module } from '@nestjs/common';
import { TenantsModule } from './tenants/tenants.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [TenantsModule, PrismaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
